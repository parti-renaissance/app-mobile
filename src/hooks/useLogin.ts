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

export const useCodeAuthRequest = (props?: { register?: boolean; state?: string }) => {
  return AuthSession.useAuthRequest(
    {
      ...BASE_REQUEST_CONFIG,
      scopes: ['jemarche_app', 'read:profile', 'write:profile'],
      usePKCE: false,
      state: props?.state,
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
  const [req, , promptAsync] = useCodeAuthRequest()
  return async (payload?: { code?: string; state?: string }) => {
    if (payload?.code) {
      WebBrowser.dismissAuthSession()
      return exchangeCodeAsync({ code: payload.code })
    }

    if (payload?.state && req) {
      req.state = payload.state
    }

    if (isWeb) {
      const url = new URL(discoveryDocument.authorizationEndpoint)
      url.searchParams.set('redirect_uri', req?.redirectUri!)
      url.searchParams.set('client_id', req?.clientId!)
      url.searchParams.set('response_type', 'code')
      if (req?.state) {
        url.searchParams.set('state', req?.state)
      }
      req?.scopes!.forEach((scope) => url.searchParams.append('scope[]', scope))
      Object.entries(req?.extraParams ?? {}).forEach(([key, value]) => url.searchParams.set(key, value))
      window.location.href = url.toString()
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
