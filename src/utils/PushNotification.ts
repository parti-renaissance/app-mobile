import dynamicLinks from '@react-native-firebase/dynamic-links'
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'
import { LocalNotificationCenter } from '../data/LocalNotificationCenter'

const registerMessageHandlers = () => {
  messaging().onMessage((message) => {
    console.log('Receiving remote notification', message)
    createLocalNotificationInForegroundIfNeeded(message)
  })
  messaging().setBackgroundMessageHandler((message) => {
    return new Promise<void>((resolve) => {
      console.log('Message handled in background', message)
      resolve()
    })
  })
}

const createLocalNotificationInForegroundIfNeeded = async (
  message: FirebaseMessagingTypes.RemoteMessage,
) => {
  const deeplinkUrl = await resolveDeeplinkUrlFromFCMMessage(message)
  // We need to present a local notification when we are in foreground
  LocalNotificationCenter.post({
    title: message.notification?.title,
    body: message.notification?.body ?? '',
    deeplinkUrl,
  })
}

const resolveDeeplinkUrlFromFCMMessage = async (
  message: FirebaseMessagingTypes.RemoteMessage | null,
): Promise<string | undefined> => {
  if (message === null) {
    return undefined
  }
  const notificationUrl = message?.data?.deeplink as string | undefined
  if (notificationUrl) {
    try {
      const { url } = await dynamicLinks().resolveLink(notificationUrl)
      return url
    } catch (error) {
      console.log('Failed to resolve dynamic link', notificationUrl, error)
    }
  }
  return undefined
}

export const PushNotification = {
  requestPermission: async (): Promise<boolean> => {
    const authStatus = await messaging().requestPermission({
      sound: true,
      alert: true,
    })
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    if (enabled) {
      const token = await messaging().getToken()
      console.log('Messaging authorization status enabled with token', token)
    }
    return enabled
  },
  setUp: () => {
    registerMessageHandlers()
  },
  getInitialDeeplinkUrl: async (): Promise<string | undefined> => {
    const message = await messaging().getInitialNotification()
    return await resolveDeeplinkUrlFromFCMMessage(message)
  },
  observeDeeplinkUrl: (observer: (url: string) => void): (() => void) => {
    const unsubscribeBackgroundObserver = messaging().onNotificationOpenedApp(
      async (message) => {
        const url = await resolveDeeplinkUrlFromFCMMessage(message)
        if (url) {
          observer(url)
        }
      },
    )
    const unsubscribeForegroundObserver =
      LocalNotificationCenter.observeDeeplinkUrl(observer)
    return () => {
      unsubscribeBackgroundObserver()
      unsubscribeForegroundObserver()
    }
  },
}
