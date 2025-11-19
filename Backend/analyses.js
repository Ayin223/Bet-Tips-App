import { getDocs, collection, query, where, doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseconfig.js";
import { getAuth, signInAnonymously } from "firebase/auth";
import fs from "fs";
import { getResponse } from "./geminiAI.js"; // This import is not used in the core logic

const auth = getAuth();
await signInAnonymously(auth);


class AnalyseData{
  constructor(){
    this.tips = []
    this.winRate = 0;
    this.totalTips = 0;
    this.wins = 0;
    this.losses = 0;
    this.totalOdds =0;
    this.wonOdds = 0;
    this.lostOdds = 0;
    this.ROI = 0;
  }

  async getData() {
      try {
        const docRef = collection(db, "tips");
        const q = query(docRef, where("status", "==", true));
        const snapshot = await getDocs(q);

         this.tips = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            league: data.league,
            matchDate: data.matchDate,
            homeTeam: data.homeTeam,
            awayTeam: data.awayTeam,
            prediction: data.prediction,
            odds: data.odds,
            homeTeamOdds: data.homeOdds,
            awayTeamOdds: data.awayOdds,
            drawOdds: data.drawOdds,
            confidence: data.confidence,
            isPremium: data.isPremium,
            outcome: data.outcome,
            homeTeamScore: data.homeScore,
            awayTeamScore: data.awayScore,
            predictionScore: data.predictionScore,
            homeTeamPoints: data.homePoints,
            numHomeTeamForm: data.numHomeForm,
            homeTeamStanding: data.HomeStanding,
            HomeTeamGamesPlayed: data.HomeGamesPlayed,
            awayTeamPoints: data.awayPoints,
            numAwayTeamForm: data.numAwayForm,
            AwayStanding: data.AwayStanding,
            AwayTeamGamesPlayed: data.AwayGamesPlayed,
            avgHomeTeamGoalsScored: data.avgHomeGoalsScored,
            avgHomeTeamGoalsConceded: data.avgHomeGoalsConceded,
            homeTeamWinRate: data.homeWinRate,
            avgAwayTeamGoalsScored: data.avgAwayGoalsScored,
            avgAwayTeamGoalsConceded: data.avgAwayGoalsConceded,
            awayTeamWinRate: data.awayWinRate,
          };
        });

        // Save to JSON file
      fs.writeFileSync("./stats/tips.json", JSON.stringify(this.tips, null, 2));
        console.log(`✅ tips.json file created successfully.`);

        return this.tips;
    } catch (err) {
        console.error(`❌ Error message: ${err}`);
        return [];
    } finally {
        console.log(`Firestore data collection completed`);
    }
  }


  getConfidence (minConf = 0, maxConf = 100){
    // ... (Your existing getConfidence method)
    const confTips = this.tips.filter(t => Number(t.confidence)*100>= minConf && Number(t.confidence)*100<= maxConf )
    this.totalTips = confTips.length

    confTips.map(t => {
        const cOdds = (t.odds)//.toFixed(2)
        
        this.totalOdds  += cOdds 
        if(t.outcome === "WON"){
        this.wins ++
        this.wonOdds += cOdds
        }else{
        this.losses++
        this.lostOdds += cOdds
        }
      }

    )

    this.winRate = (100*(this.wins/this.totalTips)).toFixed(2)
    const profit = this.wonOdds - this.totalTips
    this.ROI = Number(((profit/this.totalTips)*100).toFixed(2))
    return{
      totalTips: this.totalTips,
      winRate: `${this.winRate}%`,
      wins: this.wins,
      losses: this.losses,
      wonOdds: this.wonOdds,
      ROI: `${this.ROI}%`,
      profit: profit.toFixed(2),
    }
  }

  saveAsCsv(filename = "./stats/tips.csv") {
    if (this.tips.length === 0) {
      console.log("No data to save as CSV.");
      return;
    }
    
    const headers = Object.keys(this.tips[0]);
    const headerRow = headers.join(',');

    const dataRows = this.tips.map(obj => {
      return headers.map(header => {
        return obj[header]; 
      }).join(',');
    });

    const csvContent = [headerRow, ...dataRows].join('\n');

    try {
      fs.writeFileSync(filename, csvContent);
      console.log(`✅ ${filename} file created successfully.`);
    } catch (err) {
      console.error(`❌ Error writing CSV file: ${err}`);
    }
  }

  async AIStats(prompt){ 
    const aiInput = `${prompt}: ${JSON.stringify(this.tips, null, 2)}`;
    
    try {
        console.log("➡️ Sending data for AI analysis...");
        const aiResponse = await getResponse.chatAI(aiInput); 
        
        console.log("✅ AI Analysis Complete.");
        console.log(aiResponse)        
    } catch (err) {
        console.error(`❌ Error during AI analysis: ${err.message}`);
    }
   }
  
   async statsData(analyses){
    try{
      const docRef =  doc(db, "stat", "summary") 
      await setDoc(docRef, analyses, {merge: true} )
      console.log(`Statistics updated successfully`)
    }catch(err){
      console.log(`Error message StatsData: ${err}`)
    }finally{
      console.log(`StatsData proccess completed`)
    }
   }
}


const Ana = new AnalyseData();

await Ana.getData()
let tipsAnalytics = Ana.getConfidence()
console.log(tipsAnalytics)
await Ana.statsData(tipsAnalytics)

let question = `I want analysis this dat. And I want a summary of trends in a table format`

// Ana.saveAsCsv()
// await Ana.AIStats(question)
