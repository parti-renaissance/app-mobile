import messaging from '@react-native-firebase/messaging'
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging'
import { LocalNotificationCenter } from '../data/LocalNotificationCenter'

const registerMessageHandlers = () => {
  messaging().onMessage((message) => {
    console.log('Receiving remote notification', message)
    createLocalNotificationInForegroundIfNeeded(message)
  })
  messaging().setBackgroundMessageHandler((message) => {
    return new Promise<any>((resolve) => {
      console.log('Message handled in background', message)
      resolve()
    })
  })
}

const createLocalNotificationInForegroundIfNeeded = (
  message: FirebaseMessagingTypes.RemoteMessage,
) => {
  // We need to present a local notification when we are in foreground
  LocalNotificationCenter.post({
    title: message.notification?.title,
    body: message.notification?.body ?? '',
  })
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
}
