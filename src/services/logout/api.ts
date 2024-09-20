import { Linking } from 'react-native'
import clientEnv from '@/config/clientEnv'
import discoveryDocument from '@/config/discoveryDocument'
import { REDIRECT_URI } from '@/hooks/useLogin'
import { useUserStore } from '@/store/user-store'
import { ErrorMonitor } from '@/utils/ErrorMonitor'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'

export function useLogOut() {
  const queryClient = useQueryClient()
  const { removeCredentials, user } = useUserStore()
  return useMutation<WebBrowser.WebBrowserAuthSessionResult | void, Error>({
    mutationFn: async () => {
      removeCredentials()
      queryClient.clear()
      await queryClient.invalidateQueries()

      if (user?.isAdmin) {
        window.location.href = `${clientEnv.ADMIN_URL}/app/adherent/list?_switch_user=_exit`
        return
      }

      const lol = Linking.addEventListener('url', async (event) => {
        if (event.url.startsWith(REDIRECT_URI)) {
          WebBrowser.dismissBrowser()
          lol.remove()
        }
      })

      return WebBrowser.openAuthSessionAsync(`${discoveryDocument.endSessionEndpoint}?redirect_uri=${encodeURIComponent(REDIRECT_URI)}`, REDIRECT_URI)
    },
    onSuccess: async () => {
      router.replace({ pathname: '/(tabs)/evenements/' })
    },
    onError: (error) => {
      ErrorMonitor.log('Cannot open web browser on disconnect', {
        error: error,
      })
    },
  })
}
