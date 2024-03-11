import { type FirebaseAnalyticsTypes } from '@react-native-firebase/analytics'
import { type FirebaseMessagingTypes } from '@react-native-firebase/messaging'
import * as wAnalytics from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import * as wMessaging from 'firebase/messaging'

import firebaseConfig from './firebaseWebConfig'

// Initialize Firebase
type Mess = FirebaseMessagingTypes.Module
type Anal = FirebaseAnalyticsTypes.Module

function initFirebase() {
  const app = initializeApp(firebaseConfig)
  const Analytics = wAnalytics.getAnalytics(app)

  const Messaging = wMessaging.getMessaging(app)

  const logNotImplemented = (x: string, payload?: any) =>
    console.warn('Firebase Web - not implemented', x, payload)

  return {
    messaging: {
      onMessage: (x: Parameters<Mess['onMessage']>[0]) =>
        wMessaging.onMessage(
          Messaging,
          x as Parameters<typeof wMessaging.onMessage>[1],
        ),
      getToken: () => wMessaging.getToken(Messaging),
      deleteToken: () => wMessaging.deleteToken(Messaging),
      unsubscribeFromTopic: (x: any) =>
        logNotImplemented('unsubscribeFromTopic', x),
      subscribeToTopic: (x: any) => logNotImplemented('subscribeToTopic', x),
      setBackgroundMessageHandler: (x: any) =>
        logNotImplemented('setBackgroundMessageHandler', x),
      requestPermission: async (
        permission?: FirebaseMessagingTypes.IOSPermissions,
      ) => {
        logNotImplemented('requestPermission', permission)
        return Promise.resolve(
          'granted',
        ) as unknown as Promise<FirebaseMessagingTypes.AuthorizationStatus>
      },
    },
    analytics: {
      logEvent: (x: Parameters<typeof wAnalytics.logEvent>[1]) =>
        wAnalytics.logEvent(Analytics, x),
      logScreenView: (x: Parameters<Anal['logScreenView']>[0]) =>
        wAnalytics.logEvent(Analytics, 'screen_view', {
          firebase_screen: x.screen_name,
          firebase_screen_class: x.screen_class,
        }),
      setAnalyticsCollectionEnabled: (
        x: Parameters<typeof wAnalytics.setAnalyticsCollectionEnabled>[1],
      ) => wAnalytics.setAnalyticsCollectionEnabled(Analytics, x),
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