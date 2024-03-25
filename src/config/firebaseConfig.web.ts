import { type FirebaseAnalyticsTypes } from '@react-native-firebase/analytics'
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging'
import * as wAnalytics from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import * as wMessaging from 'firebase/messaging'
import { AuthorizationStatus } from './firebaseTypes'
import firebaseConfig from './firebaseWebConfig'

export { AuthorizationStatus }

// Initialize Firebase
type Mess = FirebaseMessagingTypes.Module
type Anal = FirebaseAnalyticsTypes.Module

function initFirebase() {
  const app = initializeApp(firebaseConfig)
  const Analytics = wAnalytics.getAnalytics(app)

  const Messaging = wMessaging.getMessaging(app)

  const logNotImplemented = (x: string, payload?: any) => console.warn('Firebase Web - not implemented', x, payload)

  return {
    messaging: {
      onMessage: (x: Parameters<Mess['onMessage']>[0]) => wMessaging.onMessage(Messaging, x as Parameters<typeof wMessaging.onMessage>[1]),
      getToken: () => wMessaging.getToken(Messaging),
      deleteToken: () => wMessaging.deleteToken(Messaging),
      unsubscribeFromTopic: (x: any) => logNotImplemented('unsubscribeFromTopic', x),
      subscribeToTopic: (x: any) => logNotImplemented('subscribeToTopic', x),
      setBackgroundMessageHandler: (x: any) => logNotImplemented('setBackgroundMessageHandler', x),
      requestPermission: async (_?: FirebaseMessagingTypes.IOSPermissions): Promise<AuthorizationStatus> => {
        switch (Notification.permission) {
          case 'granted':
            return AuthorizationStatus.AUTHORIZED
          case 'denied':
            return AuthorizationStatus.DENIED
          default:
            return AuthorizationStatus.NOT_DETERMINED
        }
      },
    },
    getInitialNotification: () => logNotImplemented('getInitialNotification'),
    onNotificationOpenedApp: (x: Parameters<Mess['onNotificationOpenedApp']>[0]) => logNotImplemented('onNotificationOpenedApp', x),
    analytics: {
      logEvent: (x: Parameters<typeof wAnalytics.logEvent>[1]) => wAnalytics.logEvent(Analytics, x),
      logScreenView: (x: Parameters<Anal['logScreenView']>[0]) =>
        wAnalytics.logEvent(Analytics, 'screen_view', {
          firebase_screen: x.screen_name,
          firebase_screen_class: x.screen_class,
        }),
      setAnalyticsCollectionEnabled: (x: Parameters<typeof wAnalytics.setAnalyticsCollectionEnabled>[1]) =>
        wAnalytics.setAnalyticsCollectionEnabled(Analytics, x),
    },
    app: {
      deviceId: app.options.appId,
    },
  }
}

const fb = initFirebase()

export default fb

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
