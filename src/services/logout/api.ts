import { Linking } from 'react-native'
import discoveryDocument from '@/config/discoveryDocument'
import { REDIRECT_URI } from '@/hooks/useLogin'
import { useUserStore } from '@/store/user-store'
import { ErrorMonitor } from '@/utils/ErrorMonitor'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'

const logout = async () => {
  const lol = Linking.addEventListener('url', async (event) => {
    if (event.url.startsWith(REDIRECT_URI)) {
      WebBrowser.dismissBrowser()
      lol.remove()
    }
  })
  return WebBrowser.openAuthSessionAsync(`${discoveryDocument.endSessionEndpoint}?redirect_uri=${encodeURIComponent(REDIRECT_URI)}`, REDIRECT_URI)
}

export function useLogOut() {
  const queryClient = useQueryClient()
  const { removeCredentials } = useUserStore()
  return useMutation<WebBrowser.WebBrowserAuthSessionResult, Error>({
    mutationFn: logout,
    onSuccess: async () => {
      removeCredentials()
      queryClient.clear()
      await queryClient.invalidateQueries()
      router.replace({ pathname: '/(tabs)/evenements/' })
    },
    onError: (error) => {
      ErrorMonitor.log('Cannot open web browser on disconnect', {
        error: error,
      })
    },
  })
}
