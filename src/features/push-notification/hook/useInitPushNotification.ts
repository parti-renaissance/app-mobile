import { useEffect } from 'react'
import { Platform } from 'react-native'
import FB, { AuthorizationStatus } from '@/config/firebaseConfig'
import { useSession } from '@/ctx/SessionProvider'
import { useQuery } from '@tanstack/react-query'
import * as Notifications from 'expo-notifications'
import { router } from 'expo-router'
import { parseHref } from '../utils'
import { useAddPushToken } from './useAddPushToken'

const SOURCE = 'vox'

const usePermission = (options: { enable: boolean }) => {
  return useQuery({
    queryKey: ['permission', SOURCE],
    queryFn: async () => {
      const authStatus = await FB.messaging.requestPermission({
        sound: true,
        alert: true,
      })
      return authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL
    },
    ...options,
  })
}

export const useInitPushNotification = () => {
  const { mutateAsync } = useAddPushToken()
  const { session } = useSession()
  const { data: hasPermission } = usePermission({ enable: !!session })

  useEffect(() => {
    if (!hasPermission) return
    let isMounted = true
    let expoNotificationSubscription: Notifications.EventSubscription | null = null
    let fbNotificationSubscription: (() => void) | null = null

    FB.messaging.getToken().then((identifier) => {
      mutateAsync({
        source: SOURCE,
        identifier,
      })
    })

    FB.messaging.getInitialNotification().then((message) => {
      if (isMounted) {
        const link = parseHref(message?.data?.deeplink)
        if (link) {
          setTimeout(() => router.replace(link), 1)
        }
      }
    })

    if (Platform.OS !== 'web') {
      expoNotificationSubscription = Notifications.addNotificationResponseReceivedListener((e) => {
        const deepLink = e.notification?.request?.content?.data?.deeplink
        const link = parseHref(deepLink)
        if (link) router.replace(link)
      })
    }

    fbNotificationSubscription = FB.messaging.onMessage((message) => {
      if (message.data?.local) return
      if (Platform.OS !== 'web') {
        Notifications.scheduleNotificationAsync({
          content: {
            title: message.notification?.title,
            body: message.notification?.body,
            data: {
              deeplink: message.data?.deeplink,
              local: true,
            },
          },
          trigger: null,
        })
      }
    })

    return () => {
      isMounted = false
      expoNotificationSubscription?.remove()
      fbNotificationSubscription?.()
    }
  }, [hasPermission])
}
