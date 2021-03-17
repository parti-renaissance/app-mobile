import _oauthHttpClient from './OAuthHttpClient'
import { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } from '../../Config'
import { RestLoginResponse } from '../restObjects/RestLoginResponse'
import ky from 'ky'
import {
  CredentialsInvalidError,
  RefreshTokenPermanentlyInvalidatedError,
} from '../../core/errors'
import { RestLoginErrorResponse } from '../restObjects/RestLoginErrorResponse'
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
      .catch((error) => {
        if (
          error instanceof ky.HTTPError &&
          error.response.status === INVALID_CREDENTIALS_HTTP_STATUS
        ) {
          return error.response.json().then((parsedResponse) => {
            const result = parsedResponse as RestLoginErrorResponse
            if (result.error === INVALID_CREDENTIALS_ERROR_CODE) {
              throw new CredentialsInvalidError('Invalid credentials')
            } else {
              throw error
            }
          })
        } else {
          throw error
        }
      })
      .catch(genericErrorMapping)
  }

  public anonymousLogin(deviceId: string): Promise<RestLoginResponse> {
    const formData = new FormData()
    formData.append('client_id', OAUTH_CLIENT_ID)
    formData.append('client_secret', OAUTH_CLIENT_SECRET)
    formData.append('grant_type', 'client_credentials')
    formData.append('scope[]', SCOPE_APP)
    formData.append('scope[]', SCOPE_READ_PROFILE)
    formData.append('scope[]', SCOPE_WRITE_PROFILE)
    formData.append('device_id', deviceId)

    return this.oauthHttpClient
      .post('oauth/v2/token', { body: formData })
      .json<RestLoginResponse>()
      .catch(genericErrorMapping)
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
          error instanceof ky.HTTPError &&
          error.response.status === INVALID_REFRESH_TOKEN_HTTP_STATUS
        ) {
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

const INVALID_CREDENTIALS_HTTP_STATUS = 401
const INVALID_REFRESH_TOKEN_HTTP_STATUS = 401
const INVALID_CREDENTIALS_ERROR_CODE = 'invalid_credentials'

export default OAuthApiService
