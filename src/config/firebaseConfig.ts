import { Platform } from 'react-native'
import nAnalytics from '@react-native-firebase/analytics'
import installations from '@react-native-firebase/installations'
import nMessaging from '@react-native-firebase/messaging'
import * as wAnalytics from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import * as wMessaging from 'firebase/messaging'
import * as envs from './env'

// Initialize Firebase
type Mess = ReturnType<typeof nMessaging>
type Anal = ReturnType<typeof nAnalytics>

function initFirebase() {
  if (Platform.OS === 'web') {
    const firebaseConfig = {
      apiKey: envs.FB_API_KEY,
      authDomain: `${envs.FB_PROJECT_ID}.firebaseapp.com`,
      projectId: envs.FB_PROJECT_ID,
      storageBucket: `${envs.FB_PROJECT_ID}.appspot.com`,
      messagingSenderId: envs.FB_SENDER_ID,
      appId: envs.FB_APP_ID,
    }
    const app = initializeApp(firebaseConfig)
    const Analytics = wAnalytics.getAnalytics(app)

    const Messaging = wMessaging.getMessaging(app)

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
          console.log('unsubscribeFromTopic', x),
        subscribeToTopic: (x: any) => console.log('subscribeToTopic', x),
        setBackgroundMessageHandler: (x: any) => console.log('not implemented'),
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
  } else {
    return {
      messaging: {
        onMessage: (x: Parameters<Mess['onMessage']>[0]) =>
          nMessaging().onMessage(x),
        getToken: () => nMessaging().getToken(),
        deleteToken: () => nMessaging().deleteToken(),
        unsubscribeFromTopic: (
          x: Parameters<Mess['unsubscribeFromTopic']>[0],
        ) => nMessaging().unsubscribeFromTopic(x),
        subscribeToTopic: (x: Parameters<Mess['subscribeToTopic']>[0]) =>
          nMessaging().subscribeToTopic(x),
      },
      analytics: {
        logEvent: (...x: Parameters<Anal['logEvent']>) =>
          nAnalytics().logEvent(...x),
        logScreenView: (x: Parameters<Anal['logScreenView']>[0]) =>
          nAnalytics().logScreenView(x),
        setAnalyticsCollectionEnabled: (
          x: Parameters<Anal['setAnalyticsCollectionEnabled']>[0],
        ) => nAnalytics().setAnalyticsCollectionEnabled(x),
      },
      app: {
        deviceId: installations().getId(),
      },
    }
  }
}

const fb = initFirebase()

export default fb

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
