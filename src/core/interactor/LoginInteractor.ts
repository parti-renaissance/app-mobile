import AuthenticationRepository from '../../data/AuthenticationRepository'
import ProfileRepository from '../../data/ProfileRepository'
import { AuthenticationState } from '../entities/AuthenticationState'

export class LoginInteractor {
  private authenticationRepository = AuthenticationRepository.getInstance()
  private profileRepository = ProfileRepository.getInstance()

  public async login(credentials: { email: string; password: string }, setSession: (session: string) => void) {
    try {
      const creds = await this.authenticationRepository.login(credentials)
      const profile = await this.profileRepository.getProfile()
      const zipCode = profile.zipCode
      await this.profileRepository.saveZipCode(zipCode)
      this.authenticationRepository.dispatchState(AuthenticationState.Authenticated)
      return [creds, profile] as const
    } catch (error) {
      // We need to clean already saved credentials if an error occurs
      // during profile | region fetch
      await this.authenticationRepository.logout(false)
      return [null, null]
    }
  }
}
