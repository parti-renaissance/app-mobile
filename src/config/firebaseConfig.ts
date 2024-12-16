import installations from '@react-native-firebase/installations'
import nMessaging from '@react-native-firebase/messaging'

export { AuthorizationStatus } from './firebaseTypes'

// Initialize Firebase
type Mess = ReturnType<typeof nMessaging>

function initFirebase() {
  return {
    messaging: {
      onMessage: (x: Parameters<Mess['onMessage']>[0]) => nMessaging().onMessage(x),
      getToken: async () => {
        return nMessaging().getToken()
      },
      deleteToken: () => nMessaging().deleteToken(),
      unsubscribeFromTopic: (x: Parameters<Mess['unsubscribeFromTopic']>[0]) => nMessaging().unsubscribeFromTopic(x),
      subscribeToTopic: (x: Parameters<Mess['subscribeToTopic']>[0]) => nMessaging().subscribeToTopic(x),
      setBackgroundMessageHandler: (x: Parameters<Mess['setBackgroundMessageHandler']>[0]) => nMessaging().setBackgroundMessageHandler(x),
      getInitialNotification: () => nMessaging().getInitialNotification(),
      onNotificationOpenedApp: (x: Parameters<Mess['onNotificationOpenedApp']>[0]) => nMessaging().onNotificationOpenedApp(x),
      requestPermission: (...x: Parameters<Mess['requestPermission']>) => nMessaging().requestPermission(...x),
    },

    app: {
      deviceId: 'fwrger',
    },
  }
}

const fb = initFirebase()

export default fb

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
