import { HTTPError } from 'ky'
import { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } from '../../config/env'
import { RefreshTokenPermanentlyInvalidatedError } from '../../core/errors'
import { RestLoginResponse } from '../restObjects/RestLoginResponse'
import { mapLoginError } from './errorMappers'
import { logHttpError } from './NetworkLogger'
import _oauthHttpClient from './OAuthHttpClient'
import { genericErrorMapping } from './utils'

class OAuthApiService {
  private static instance: OAuthApiService
  private oauthHttpClient = _oauthHttpClient
  private constructor() {}

  public login(
    username: string,
    password: string,
    deviceId: string,
  ): Promise<RestLoginResponse> {
    const formData = new FormData()
    formData.append('client_id', OAUTH_CLIENT_ID)
    formData.append('client_secret', OAUTH_CLIENT_SECRET)
    formData.append('grant_type', 'password')
    formData.append('scope[]', SCOPE_APP)
    formData.append('scope[]', SCOPE_READ_PROFILE)
    formData.append('scope[]', SCOPE_WRITE_PROFILE)
    formData.append('device_id', deviceId)
    formData.append('username', username)
    formData.append('password', password)

    return this.oauthHttpClient
      .post('oauth/v2/token', { body: formData })
      .json<RestLoginResponse>()
      .catch(mapLoginError)
  }

  public refreshToken(refreshToken: string): Promise<RestLoginResponse> {
    const formData = new FormData()
    formData.append('client_id', OAUTH_CLIENT_ID)
    formData.append('client_secret', OAUTH_CLIENT_SECRET)
    formData.append('grant_type', 'refresh_token')
    formData.append('refresh_token', refreshToken)

    return this.oauthHttpClient
      .post('oauth/v2/token', { body: formData })
      .json<RestLoginResponse>()
      .catch((error) => {
        if (
          error instanceof HTTPError &&
          error.response.status === INVALID_REFRESH_TOKEN_HTTP_STATUS
        ) {
          logHttpError(error, '[RefreshToken] Failed to refresh token')
          throw new RefreshTokenPermanentlyInvalidatedError()
        } else {
          throw error
        }
      })
      .catch(genericErrorMapping)
  }

  public static getInstance(): OAuthApiService {
    if (!OAuthApiService.instance) {
      OAuthApiService.instance = new OAuthApiService()
    }
    return OAuthApiService.instance
  }
}

const SCOPE_APP = 'jemarche_app'
const SCOPE_READ_PROFILE = 'read:profile'
const SCOPE_WRITE_PROFILE = 'write:profile'

const INVALID_REFRESH_TOKEN_HTTP_STATUS = 401

export default OAuthApiService
