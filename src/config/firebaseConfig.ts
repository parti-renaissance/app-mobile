import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FB_API_KEY,
  authDomain: `${process.env.EXPO_PUBLIC_FB_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.EXPO_PUBLIC_FB_PROJECT_ID,
  storageBucket: `${process.env.EXPO_PUBLIC_FB_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.EXPO_PUBLIC_FB_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FB_APP_ID,
};

export const app = initializeApp(firebaseConfig);

// export const Messaging = getMessaging(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
