import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD16v66q_FkORd_VD6E6faJPRevIzPL328",
  authDomain: "bet-tips-a48b8.firebaseapp.com",
  projectId: "bet-tips-a48b8",
  storageBucket: "bet-tips-a48b8.firebasestorage.app",
  messagingSenderId: "998835172624",
  appId: "1:998835172624:web:04439028edfc5386d36195",
  measurementId: "G-N26KCFBKCG",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

