import { useEffect } from 'react'
import discoveryDocument from '@/config/discoveryDocument'
import { OAUTH_CLIENT_ID } from '@/config/env'
import * as AuthSession from 'expo-auth-session'
import { maybeCompleteAuthSession } from 'expo-web-browser'
import { use } from 'i18next'
import useAsyncState from './useAsyncState'
import useBrowserWarmUp from './useBrowserWarmUp'

maybeCompleteAuthSession()

const REDIRECT_URI = AuthSession.makeRedirectUri()
const BASE_REQUEST_CONFIG = { clientId: OAUTH_CLIENT_ID, redirectUri: REDIRECT_URI } as const

export const useCodeAuthRequest = () => {
  return AuthSession.useAuthRequest({
    ...BASE_REQUEST_CONFIG,
    scopes: ['jemarche_app'],
  }, discoveryDocument)
}

export const useLogin = () => {
  useBrowserWarmUp()
  const [response, result, promptAsync] = useCodeAuthRequest()
  console.log(result)
  return () =>
    promptAsync().then((codeResult) => {
      if (codeResult.type === 'success') {
        const code = codeResult.params.code
        console.log(codeResult.params)
        if (!code) return console.error('No code in response')
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
