import clientEnv from '@/config/clientEnv'
import discoveryDocument from '@/config/discoveryDocument'
import * as AuthSession from 'expo-auth-session'
import { maybeCompleteAuthSession } from 'expo-web-browser'
import * as WebBrowser from 'expo-web-browser'
import { isWeb } from 'tamagui'
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
    props?.register
      ? {
          authorizationEndpoint: discoveryDocument.registrationEndpoint,
        }
      : discoveryDocument,
  )
}

const exchangeCodeAsync = ({ code }: { code: string }) => {
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
  const [, , promptAsync] = useCodeAuthRequest()
  return (code?: string) => {
    if (code) {
      console.log('code', code)
      WebBrowser.dismissAuthSession()
      return exchangeCodeAsync({ code })
    }

    if (isWeb) {
      window.location.href = discoveryDocument.authorizationEndpoint + `?redirect_uri=${REDIRECT_URI}&clientId=${BASE_REQUEST_CONFIG.clientId}&utm_source=app`
      return null
    }

    return promptAsync({
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.CURRENT_CONTEXT,
      createTask: false,
    }).then((codeResult) => {
      if (codeResult.type === 'success') {
        const code = codeResult.params.code
        return exchangeCodeAsync({ code })
      }
      throw new Error('Error during login', { cause: JSON.stringify(codeResult) })
    })
  }
}

export const useRegister = () => {
  useBrowserWarmUp()
  const [, , promptAsync] = useCodeAuthRequest({ register: true })
  return () => {
    if (isWeb) {
      window.location.href = discoveryDocument.registrationEndpoint + `?redirect_uri=${REDIRECT_URI}&utm_source=app`
      return null
    }

    return promptAsync({
      createTask: false,
    }).then((codeResult) => {
      if (codeResult.type === 'success') {
        const code = codeResult.params.code
        return exchangeCodeAsync({ code })
      } else {
        throw new Error('Error during registration', { cause: JSON.stringify(codeResult) })
      }
    })
  }
}

export default useLogin
