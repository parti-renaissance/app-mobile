import discoveryDocument from '@/config/discoveryDocument'
import { OAUTH_CLIENT_ID } from '@/config/env'
import * as AuthSession from 'expo-auth-session'
import { maybeCompleteAuthSession } from 'expo-web-browser'
import useBrowserWarmUp from './useBrowserWarmUp'

maybeCompleteAuthSession()

const REDIRECT_URI = AuthSession.makeRedirectUri()
const BASE_REQUEST_CONFIG = { clientId: OAUTH_CLIENT_ID, redirectUri: REDIRECT_URI } as const

export const useCodeAuthRequest = () => {
  return AuthSession.useAuthRequest(
    {
      ...BASE_REQUEST_CONFIG,
      scopes: ['jemarche_app', 'read:profile', 'write:profile'],
    },
    discoveryDocument,
  )
}

export const useLogin = () => {
  useBrowserWarmUp()
  const [response, , promptAsync] = useCodeAuthRequest()
  return () =>
    promptAsync().then((codeResult) => {
      if (codeResult.type === 'success') {
        const code = codeResult.params.code
        if (!code) return null
        return AuthSession.exchangeCodeAsync(
          {
            ...BASE_REQUEST_CONFIG,
            code,
            extraParams: { code_verifier: response?.codeVerifier },
          },
          discoveryDocument,
        )
      }
      return null
    })
}

export default useLogin
