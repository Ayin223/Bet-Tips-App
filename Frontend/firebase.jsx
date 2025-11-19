import { initializeApp as initWebApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

let analyticsInstance;

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD16v66q_FkORd_VD6E6faJPRevIzPL328",
  authDomain: "bet-tips-a48b8.firebaseapp.com",
  projectId: "bet-tips-a48b8",
  storageBucket: "bet-tips-a48b8.firebasestorage.app",
  messagingSenderId: "998835172624",
  appId: "1:998835172624:web:04439028edfc5386d36195",
  measurementId: "G-N26KCFBKCG",
};

// Web Firestore
const webApp = initWebApp(firebaseConfig);
export const db = getFirestore(webApp);

// Native Analytics (EAS/custom dev client)
// if (Platform.OS !== 'web') {
//   try {
//     const { default: firebaseAnalytics } = require('@react-native-firebase/analytics');
//     analyticsInstance = firebaseAnalytics; // **do NOT call it**
//   } catch (e) {
//     console.warn('React Native Firebase Analytics not available', e);
//     analyticsInstance = {
//       logEvent: async () => {}, // fallback
//     };
//   }
// } else {
//   // Web or Expo Go fallback
//   analyticsInstance = {
//     logEvent: async () => {}, // no-op
//   };
// }

// export const analytics = analyticsInstance;
