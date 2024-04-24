import clientEnv from '@/config/clientEnv'
import discoveryDocument from '@/config/discoveryDocument'
import * as AuthSession from 'expo-auth-session'
import { maybeCompleteAuthSession } from 'expo-web-browser'
import * as WebBrowser from 'expo-web-browser'
import useBrowserWarmUp from './useBrowserWarmUp'

maybeCompleteAuthSession()

export const REDIRECT_URI = AuthSession.makeRedirectUri()
const BASE_REQUEST_CONFIG = { clientId: clientEnv.OAUTH_CLIENT_ID, redirectUri: REDIRECT_URI }

export const useCodeAuthRequest = (props?: { register: boolean }) => {
  return AuthSession.useAuthRequest(
    {
      ...BASE_REQUEST_CONFIG,
      scopes: ['jemarche_app', 'read:profile', 'write:profile'],
      usePKCE: false,
      extraParams: {
        utm_source: 'app',
      },
    },
    props && props?.register
      ? {
          authorizationEndpoint: discoveryDocument.registrationEndpoint,
        }
      : discoveryDocument,
  )
}

const exchangeCodeAsync = ({ code, code_verifier }: { code: string; code_verifier?: string }) => {
  if (!code) return null
  return AuthSession.exchangeCodeAsync(
    {
      ...BASE_REQUEST_CONFIG,
      code,
    },
    discoveryDocument,
  )
}

export const useLogin = () => {
  useBrowserWarmUp()
  const [response, , promptAsync] = useCodeAuthRequest()
  return (code?: string) => {
    if (code) {
      WebBrowser.dismissAuthSession()
      return exchangeCodeAsync({ code, code_verifier: response?.codeVerifier })
    } else {
      return promptAsync({
        createTask: false,
      }).then((codeResult) => {
        if (codeResult.type === 'success') {
          const code = codeResult.params.code
          return exchangeCodeAsync({ code, code_verifier: response?.codeVerifier })
        }
        return null
      })
    }
  }
}

export const useRegister = () => {
  useBrowserWarmUp()
  const [response, , promptAsync] = useCodeAuthRequest({ register: true })
  return () =>
    promptAsync({
      createTask: false,
    }).then((codeResult) => {
      if (codeResult.type === 'success') {
        const code = codeResult.params.code
        return exchangeCodeAsync({ code, code_verifier: response?.codeVerifier })
      } else {
        throw new Error('Error during registration')
      }
    })
}

export default useLogin
