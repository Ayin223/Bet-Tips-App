import { db } from "./firebaseconfig.js";
import { doc, setDoc } from "firebase/firestore";
import { analysis } from "./predictor.js";
import { getAuth, signInAnonymously } from "firebase/auth";


const auth = getAuth();
await signInAnonymously(auth);

// --- Upload each tip to Firestore ---
async function upDateTips(tipsArray) {
  try {
    for (const tip of tipsArray.uploadTips) {
      const docRef = doc(db, "tips", tip.matchID); 
      
      await setDoc(docRef, tip, { merge: true }); 
      console.log(`✅ Tip for match ${tip.matchID} added/updated successfully.`);
    }
  } catch (err) {
    console.error("❌ Error adding document:", err);
  } finally {
    console.log("✅ Firebase update completed!");
  }
}


await upDateTips(analysis())
