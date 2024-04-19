import { Linking } from 'react-native';
import discoveryDocument from '@/config/discoveryDocument';
import FB from '@/config/firebaseConfig';
import { AuthenticationState } from '@/core/entities/AuthenticationState';
import { RefreshTokenPermanentlyInvalidatedError } from '@/core/errors';
import { REDIRECT_URI } from '@/hooks/useLogin';
import { ErrorMonitor } from '@/utils/ErrorMonitor';
import * as WebBrowser from 'expo-web-browser';
import OAuthApiService from './network/OAuthApiService';
import PushRepository from './PushRepository';
import { RestLoginResponse } from './restObjects/RestLoginResponse';
import CacheManager from './store/CacheManager';
import { Credentials } from './store/Credentials';
import LocalStore from './store/LocalStore';


class AuthenticationRepository {
  private static instance: AuthenticationRepository
  private apiService = OAuthApiService.getInstance()
  private localStore = LocalStore.getInstance()
  private pushRepository = PushRepository.getInstance()
  public sessionSetter?: (session: string | null) => void

  private constructor() {}

  public stateListener?: (state: AuthenticationState) => void

  public getAuthenticationState(): Promise<AuthenticationState> {
    return this.localStore.getCredentials().then((credentials) => {
      if (credentials === null) {
        return AuthenticationState.Unauthenticated
      }
      // anonymous users don't retrieve a refresh token during authentication
      if (credentials.refreshToken === null || credentials.refreshToken === undefined) {
        return AuthenticationState.Anonymous
      }
      return AuthenticationState.Authenticated
    })
  }

  public async login({ email, password }: { email: string; password: string }) {
    const instanceId = await this.getDeviceId()
    const result = await this.apiService.login(email, password, instanceId)
    const credentials = this.mapCredentials(result)

    // We want to remove preferences as we may have saved an anonymous zipcode before
    await this.localStore.clearPreferences()
    this.sessionSetter?.(JSON.stringify(credentials))
    return JSON.stringify(credentials)
  }

  public async refreshToken(refreshToken: string): Promise<Credentials> {
    try {
      const result = await this.apiService.refreshToken(refreshToken)
      const credentials = this.mapCredentials(result)
      await this.localStore.storeCredentials(credentials)
      return credentials
    } catch (error) {
      if (error instanceof RefreshTokenPermanentlyInvalidatedError) {
        await this.logout(false)
      }
      throw error
    }
  }

  public async logout(dissociateToken: boolean = true): Promise<void> {
    try {
      const lol = Linking.addEventListener('url', async (event) => {
        if (event.url.startsWith(REDIRECT_URI)) {
          WebBrowser.dismissBrowser()
          lol.remove()
        }
      })
      await WebBrowser.openAuthSessionAsync(`${discoveryDocument.endSessionEndpoint}?redirect_uri=${encodeURIComponent(REDIRECT_URI)}`, REDIRECT_URI)
    } catch (e) {
      ErrorMonitor.log('Cannot open web browser on disconnect', {
        error: e,
      })
    }

    if (dissociateToken) {
      await this.pushRepository.dissociateToken()
    }
    await this.localStore.clearCredentials()
    await this.localStore.clearPreferences()
    await CacheManager.getInstance().purgeCache()
    ErrorMonitor.clearUser()

    try {
      await this.pushRepository.invalidatePushToken()
    } catch (error) {
      // logout should not be blocked if the user is offline
      console.log(error)
    }

    this.dispatchState(AuthenticationState.Unauthenticated)
    this.sessionSetter?.(null)
  }

  public dispatchState(state: AuthenticationState) {
    const listener = this.stateListener
    if (listener) {
      listener(state)
    }
  }

  public async getDeviceId(): Promise<string> {
    return FB.app.deviceId
  }

  private mapCredentials(result: RestLoginResponse): Credentials {
    return {
      accessToken: result.access_token,
      refreshToken: result.refresh_token,
    }
  }

  public static getInstance(): AuthenticationRepository {
    if (!AuthenticationRepository.instance) {
      AuthenticationRepository.instance = new AuthenticationRepository()
    }

    return AuthenticationRepository.instance
  }
}

export default AuthenticationRepository
