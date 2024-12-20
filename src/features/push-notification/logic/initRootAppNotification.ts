import { Platform } from 'react-native'
import FB from '@/config/firebaseConfig'
import * as Notifications from 'expo-notifications'
import { router } from 'expo-router'
import { parseHref } from '../utils'

export default () => {
  if (Platform.OS !== 'web') {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true, // Show the alert while the app is in foreground
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    })
  }

  FB.messaging.setBackgroundMessageHandler((message) => {
    return new Promise<void>((resolve) => {
      console.log('Message handled in background', message)
      resolve()
    })
  })

  FB.messaging.onNotificationOpenedApp(async (message) => {
    const link = parseHref(message?.data?.deeplink)
    if (link) {
      router.replace(link)
    }
  })
}
