import { configDotenv } from "dotenv";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

configDotenv()

const firebaseConfig = {
  apiKey: process.env.fireAPI,
  authDomain: process.env.fireAuthDomain,
  projectId: process.env.fireProjID,
  storageBucket: process.env.fireStorBucket,
  messagingSenderId: process.env.fireMsgID,
  appId: process.env.fireAppID,
  measurementId: process.env.fireMeasureID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
 export { db };

