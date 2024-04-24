import clientEnv from './clientEnv'

export default {
  apiKey: clientEnv.FB_API_KEY,
  authDomain: `${clientEnv.FB_PROJECT_ID}.firebaseapp.com`,
  projectId: clientEnv.FB_PROJECT_ID,
  storageBucket: `${clientEnv.FB_PROJECT_ID}.appspot.com`,
  messagingSenderId: clientEnv.FB_SENDER_ID,
  appId: clientEnv.FB_APP_ID,
  measurementId: clientEnv.FB_MEASUREMENT_ID,
}
