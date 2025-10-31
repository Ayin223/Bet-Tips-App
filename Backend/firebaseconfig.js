// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD16v66q_FkORd_VD6E6faJPRevIzPL328",
  authDomain: "bet-tips-a48b8.firebaseapp.com",
  projectId: "bet-tips-a48b8",
  storageBucket: "bet-tips-a48b8.firebasestorage.app",
  messagingSenderId: "998835172624",
  appId: "1:998835172624:web:04439028edfc5386d36195",
  measurementId: "G-N26KCFBKCG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
 export {db}
