import discoveryDocument from '@/config/discoveryDocument'
import * as AuthSession from 'expo-auth-session'
import { maybeCompleteAuthSession } from 'expo-web-browser'
import useBrowserWarmUp from './useBrowserWarmUp'

maybeCompleteAuthSession()

const REDIRECT_URI = AuthSession.makeRedirectUri()

if (!process.env.EXPO_PUBLIC_OAUTH_CLIENT_ID) {
  throw new Error('Missing process.env.EXPO_PUBLIC_OAUTH_CLIENT_ID')
}

const BASE_REQUEST_CONFIG = { clientId: process.env.EXPO_PUBLIC_OAUTH_CLIENT_ID, redirectUri: REDIRECT_URI } as const

export const useCodeAuthRequest = () => {
  return AuthSession.useAuthRequest(
    {
      ...BASE_REQUEST_CONFIG,
      scopes: ['jemarche_app', 'read:profile', 'write:profile'],
    },
    discoveryDocument,
  )
}

const exchangeCodeAsync = ({ code, code_verifier }: { code: string; code_verifier?: string }) => {
  if (!code) return null
  return AuthSession.exchangeCodeAsync(
    {
      ...BASE_REQUEST_CONFIG,
      code,
      extraParams: code_verifier ? { code_verifier } : undefined,
    },
    discoveryDocument,
  )
}

export const useLogin = () => {
  useBrowserWarmUp()
  const [response, , promptAsync] = useCodeAuthRequest()
  return (code?: string) =>
    code
      ? exchangeCodeAsync({ code })
      : promptAsync().then((codeResult) => {
          if (codeResult.type === 'success') {
            const code = codeResult.params.code
            return exchangeCodeAsync({ code, code_verifier: response?.codeVerifier })
          }
          return null
        })
}

export default useLogin
