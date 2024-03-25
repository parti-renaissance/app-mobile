import nAnalytics from '@react-native-firebase/analytics'
import installations from '@react-native-firebase/installations'
import nMessaging from '@react-native-firebase/messaging'

export { AuthorizationStatus } from './firebaseTypes'

// Initialize Firebase
type Mess = ReturnType<typeof nMessaging>
type Anal = ReturnType<typeof nAnalytics>

function initFirebase() {
  return {
    messaging: {
      onMessage: (x: Parameters<Mess['onMessage']>[0]) => nMessaging().onMessage(x),
      getToken: () => nMessaging().getToken(),
      deleteToken: () => nMessaging().deleteToken(),
      unsubscribeFromTopic: (x: Parameters<Mess['unsubscribeFromTopic']>[0]) => nMessaging().unsubscribeFromTopic(x),
      subscribeToTopic: (x: Parameters<Mess['subscribeToTopic']>[0]) => nMessaging().subscribeToTopic(x),
      setBackgroundMessageHandler: (x: Parameters<Mess['setBackgroundMessageHandler']>[0]) => nMessaging().setBackgroundMessageHandler(x),
      getInitialNotification: () => nMessaging().getInitialNotification(),
      onNotificationOpenedApp: (x: Parameters<Mess['onNotificationOpenedApp']>[0]) => nMessaging().onNotificationOpenedApp(x),
      requestPermission: nMessaging().requestPermission,
    },
    analytics: {
      logEvent: (...x: Parameters<Anal['logEvent']>) => nAnalytics().logEvent(...x),
      logScreenView: (x: Parameters<Anal['logScreenView']>[0]) => nAnalytics().logScreenView(x),
      setAnalyticsCollectionEnabled: (x: Parameters<Anal['setAnalyticsCollectionEnabled']>[0]) => nAnalytics().setAnalyticsCollectionEnabled(x),
    },
    app: {
      deviceId: installations().getId(),
    },
  }
}

const fb = initFirebase()

export default fb

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
