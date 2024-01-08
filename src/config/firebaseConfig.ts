import { Platform } from 'react-native'
import nAnalytics from '@react-native-firebase/analytics'
import installations from '@react-native-firebase/installations'
import nMessaging from '@react-native-firebase/messaging'
import { de } from 'date-fns/locale'
import wAnalytics, { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import wMessaging, { getMessaging } from 'firebase/messaging'

// Initialize Firebase

function initFirebase() {
  if (Platform.OS === 'web') {
    const firebaseConfig = {
      apiKey: process.env.EXPO_PUBLIC_FB_API_KEY,
      authDomain: `${process.env.EXPO_PUBLIC_FB_PROJECT_ID}.firebaseapp.com`,
      projectId: process.env.EXPO_PUBLIC_FB_PROJECT_ID,
      storageBucket: `${process.env.EXPO_PUBLIC_FB_PROJECT_ID}.appspot.com`,
      messagingSenderId: process.env.EXPO_PUBLIC_FB_SENDER_ID,
      appId: process.env.EXPO_PUBLIC_FB_APP_ID,
    }
    const app = initializeApp(firebaseConfig)
    const Analytics = getAnalytics(app)

    const Messaging = getMessaging(app)

    return {
      messaging: {
        onMessage: (x: Parameters<typeof wMessaging.onMessage>[1]) =>
          wMessaging.onMessage(Messaging, x),
        getToken: () => wMessaging.getToken(Messaging),
        deleteToken: () => wMessaging.deleteToken(Messaging),
      },
      analytics: {
        logEvent: (x: Parameters<typeof wAnalytics.logEvent>[1]) =>
          wAnalytics.logEvent(Analytics, x),
        logScreenView: (x: Parameters<typeof wAnalytics.logEvent>[1]) =>
          wAnalytics.logEvent(Analytics, x),
        setAnalyticsCollectionEnabled: (
          x: Parameters<typeof wAnalytics.setAnalyticsCollectionEnabled>[1],
        ) => wAnalytics.setAnalyticsCollectionEnabled(Analytics, x),
      },
      app: {
        deviceId: app.options.appId,
      },
    }
  } else {
    type Mess = ReturnType<typeof nMessaging>
    type Anal = ReturnType<typeof nAnalytics>
    return {
      messaging: {
        onMessage: (x: Parameters<Mess['onMessage']>[0]) =>
          nMessaging().onMessage(x),
        getToken: () => nMessaging().getToken(),
        deleteToken: () => nMessaging().deleteToken(),
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
