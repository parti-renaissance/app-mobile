import * as envs from './env'

export default {
  apiKey: envs.FB_API_KEY,
  authDomain: `${envs.FB_PROJECT_ID}.firebaseapp.com`,
  projectId: envs.FB_PROJECT_ID,
  storageBucket: `${envs.FB_PROJECT_ID}.appspot.com`,
  messagingSenderId: envs.FB_SENDER_ID,
  appId: envs.FB_APP_ID,
}
