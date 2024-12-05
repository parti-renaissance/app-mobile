import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'

export interface LocalNotification {
  title?: string
  body: string
  deeplinkUrl?: string
}

let currentObserver: ((url: string) => void) | undefined

PushNotification.configure({
  onNotification: (notification) => {
    // We have to change the type from any to object
    const data = notification.data as { [key: string]: string } | undefined
    if (data && data.deeplinkUrl) {
      const deeplinkUrl: string | undefined = data.deeplinkUrl
      if (deeplinkUrl) {
        currentObserver?.(deeplinkUrl)
      }
    }
    notification.finish(PushNotificationIOS.FetchResult.NoData)
  },
})

export const LocalNotificationCenter = {
  post: (notification: LocalNotification) => {
    if (notification.body.length === 0) {
      return
    }
    PushNotification.localNotification({
      title: notification.title,
      message: notification.body,
      largeIcon: '',
      smallIcon: 'ic_notification',
      userInfo: {
        deeplinkUrl: notification.deeplinkUrl,
      },
    })
  },
  observeDeeplinkUrl: (observer: (url: string) => void): (() => void) => {
    currentObserver = observer
    return () => {
      currentObserver = undefined
    }
  },
}
