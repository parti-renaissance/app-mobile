export default {
  apiKey: process.env.EXPO_PUBLIC_FB_API_KEY,
  authDomain: `${process.env.EXPO_PUBLIC_FB_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.EXPO_PUBLIC_FB_PROJECT_ID,
  storageBucket: `${process.env.EXPO_PUBLIC_FB_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.EXPO_PUBLIC_FB_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FB_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FB_MEASUREMENT_ID,
}
