import {getDocs, collection, setDoc,doc} from "firebase/firestore";
import { db } from "./firebaseconfig.js";
import { fetchFixtures } from "./fixtures.js";
import { getAuth, signInAnonymously } from "firebase/auth";


const auth = getAuth();
await signInAnonymously(auth);



async function getFirestoreFixtures(day) {

  const fixtures = await fetchFixtures(day)
  //console.log(today)

  try {
    const tipsRef = collection(db, "tips");
    const tipsSnapshot = await getDocs(tipsRef);
    const allFixtures = Object.values(fixtures).flat();

    // 1. Prepare the updates and collect the results
    const updatePromises = [];
    
    // Use .map() to transform the snapshot into results and promises
    const matchedTips = tipsSnapshot.docs.map((tipdoc) => {
      const storedMatch = tipdoc.data();
      const matchID = storedMatch.matchID;
      
      
      const match = allFixtures.find(
        (s) => s.matchID === matchID
      );


      if (!match) { 
          return null; // Skip if no corresponding fixture is found
      }
      
      const status = match.completed;
      if(!status) return null;

      const homeScore = match.home.score;
      const awayScore = match.away.score;
      const prediction = storedMatch.prediction;

      const matchWinner =
          homeScore > awayScore
              ? `${storedMatch.homeTeam} wins`
              : homeScore < awayScore
              ? `${storedMatch.awayTeam} wins`
              : "Draw";

      // IMPORTANT: Your outcome logic is flawed if a draw happens. 
      // If a draw occurs, 'matchWinner' is "Draw", and the outcome is always "LOST".
      // This logic assumes a user can't predict a draw. If they can, you need to adjust this.
      const outcome =
          matchWinner === "Draw"  && prediction === "Draw"
              ? "WON"
              : prediction === matchWinner
              ? "WON"
              : "LOST";

      const resultsData = {
          matchWinner,
          prediction,
          homeScore,
          awayScore,
          status,
          outcome,
      };

      // 2. Prepare the update promise
      const docRef = doc(db, "tips", matchID);
      const updatePromise = setDoc(docRef, resultsData, {merge: true});
      
      console.log(`MatchID ${matchID} set to update`)

      
      // Add the promise to the array
      updatePromises.push(updatePromise);
      
      // 3. Return the result data for the final array
      return {
        matchID,
        ...resultsData
      };

    }).filter(Boolean); 

    await Promise.all(updatePromises);
    console.log(`All matches results updated successfully`)
    
    return matchedTips;

  } catch (err) {
    console.error(`Error message: ${err.message}`);
    throw err; 
  }
}


const day = new Date()
const today = day.toISOString().slice(0, 10).replace(/-/g, "")

day.setDate(day.getDate() -1)
const yesterday = day.toISOString().slice(0, 10).replace(/-/g, "")

// console.log(`${yesterday} - ${today}`)

await getFirestoreFixtures(today).then(()=> 
  console.log(`
                ⬆ Todays's Tips
`)
)

await getFirestoreFixtures(yesterday).then(()=> 
  console.log(`
                ⬆ Yesterday's Tips
`)
)