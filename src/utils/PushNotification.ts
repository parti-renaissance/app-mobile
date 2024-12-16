// import FB, { AuthorizationStatus } from '@/config/firebaseConfig'
// import { LocalNotificationCenter } from '@/data/LocalNotificationCenter'
import { askNativePermission } from '@/utils/NotificationPermission/NotificationPermission'
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging'

const registerMessageHandlers = () => {
  // FB.messaging.onMessage((message) => {
  //   console.log('Receiving remote notification', message)
  //   createLocalNotificationInForegroundIfNeeded(message)
  // })
  // FB.messaging.setBackgroundMessageHandler((message) => {
  //   return new Promise<void>((resolve) => {
  //     console.log('Message handled in background', message)
  //     resolve()
  //   })
  // })
}

// const createLocalNotificationInForegroundIfNeeded = async (message: FirebaseMessagingTypes.RemoteMessage) => {
//   const deeplinkUrl = await resolveDeeplinkUrlFromFCMMessage(message)
//   // We need to present a local notification when we are in foreground
//   LocalNotificationCenter.post({
//     title: message.notification?.title,
//     body: message.notification?.body ?? '',
//     deeplinkUrl,
//   })
// }

const resolveDeeplinkUrlFromFCMMessage = async (message: FirebaseMessagingTypes.RemoteMessage | null): Promise<string | undefined> => {
  if (message === null) {
    return undefined
  }
  const notificationUrl = message?.data?.deeplink as string | undefined
  if (notificationUrl) {
    try {
      return notificationUrl
    } catch (error) {
      console.log('Failed to resolve dynamic link', notificationUrl, error)
    }
  }
  return undefined
}

export const PushNotification = {
  requestPermission: async (): Promise<boolean> => {
    askNativePermission()

    // const authStatus = await FB.messaging.requestPermission({
    //   sound: true,
    //   alert: true,
    // })
    // const enabled = authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL
    // if (enabled) await FB.messaging.getToken()
    // return enabled
    return false
  },
  setUp: () => {
    registerMessageHandlers()
  },
  getInitialDeeplinkUrl: async (): Promise<string | undefined> => {
    // const message = await FB.messaging.getInitialNotification()
    // return await resolveDeeplinkUrlFromFCMMessage(message)
  },
  observeDeeplinkUrl: (observer: (url: string) => void): (() => void) => {
    // const unsubscribeBackgroundObserver = FB.messaging.onNotificationOpenedApp(async (message) => {
    //   const url = await resolveDeeplinkUrlFromFCMMessage(message)
    //   if (url) {
    //     observer(url)
    //   }
    // })
    // const unsubscribeForegroundObserver = LocalNotificationCenter.observeDeeplinkUrl(observer)
    return () => {
      //   unsubscribeBackgroundObserver()
      //   unsubscribeForegroundObserver()
    }
  },
}
