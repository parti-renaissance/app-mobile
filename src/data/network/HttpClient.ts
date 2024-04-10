import { Mutex } from 'async-mutex'
import ky from 'ky'
import { API_BASE_URL } from '../../config/env'
import AuthenticationRepository from '../AuthenticationRepository'
import { Credentials } from '../store/Credentials'
import LocalStore from '../store/LocalStore'

const injectAccessTokenHook = async (request: Request) => {
  const credentials = await LocalStore.getInstance().getCredentials()
  if (credentials == null || request.headers.has('Authorization')) {
    // don't inject accessToken
    return request
  } else {
    request.headers.set('Authorization', `Bearer ${credentials.accessToken}`)
    return request
  }
}

const refreshTokenMutex = new Mutex()

const refreshToken = async (options: { request: Request }) => {
  const requestAccessToken = extractAccessToken(options.request)
  return refreshTokenMutex.runExclusive(async () => {
    const credentials = await LocalStore.getInstance().getCredentials()
    if (credentials === null || !credentials.refreshToken) {
      return
    }
    const tokenHasBeenRefreshed = credentials.accessToken !== requestAccessToken
    if (tokenHasBeenRefreshed) {
      options.request.headers.set('Authorization', `Bearer ${credentials?.accessToken}`)
      return
    }

    const authenticationRepository = AuthenticationRepository.getInstance()
    let newCredentials: Credentials = await authenticationRepository.refreshToken(credentials.refreshToken)

    options.request.headers.set('Authorization', `Bearer ${newCredentials?.accessToken}`)
  })
}

function extractAccessToken(request: Request): string | null {
  const headerValue = request.headers.get('Authorization')
  if (headerValue == null) return null
  const accessToken = headerValue.replace(/^Bearer /, '')
  return accessToken
}

const baseHttpClient = ky.create({
  prefixUrl: API_BASE_URL,
})

const httpClient = baseHttpClient.extend({
  retry: {
    limit: 2,
    methods: ['get', 'put', 'post', 'delete', 'patch'],
    statusCodes: [401],
  },
  hooks: {
    beforeRequest: [injectAccessTokenHook],
    beforeRetry: [refreshToken],
  },
})

export const publicHttpClient = baseHttpClient

export default httpClient
