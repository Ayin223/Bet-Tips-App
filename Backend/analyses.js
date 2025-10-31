import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "./firebaseconfig.js";
import { getAuth, signInAnonymously } from "firebase/auth";
import fs from "fs";

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
            homeOdds: data.homeOdds,
            awayOdds: data.awayOdds,
            drawOdds: data.drawOdds,
            confidence: data.confidence,
            isPremium: data.isPremium,
            outcome: data.outcome,
            homeScore: data.homeScore,
            awayScore: data.awayScore,
            predictionScore: data.predictionScore,
            homePoints: data.homePoints,
            HomeStanding: data.HomeStanding,
            HomeGamesPlayed: data.HomeGamesPlayed,
            awayPoints: data.awayPoints,
            AwayStanding: data.AwayStanding,
            AwayGamesPlayed: data.AwayGamesPlayed,
            avgHomeGoalsScored: data.avgHomeGoalsScored,
            avgHomeGoalsConceded: data.avgHomeGoalsConceded,
            homeWinRate: data.homeWinRate,
            avgAwayGoalsScored: data.avgAwayGoalsScored,
            avgAwayGoalsConceded: data.avgAwayGoalsConceded,
            awayWinRate: data.awayWinRate,
          };
        });

        // Save to JSON file
      // fs.writeFileSync("./stats/tips.json", JSON.stringify(tips, null, 2));
        //console.log(`✅ tips.json file created successfully.`);

        return this.tips;
    } catch (err) {
        console.error(`❌ Error message: ${err}`);
        return [];
    } finally {
        console.log(`Data collection completed`);
    }
      
  }


  getConfidence (minConf, maxConf){
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
      profit,
    }

  }


  

}


const Ana = new AnalyseData();

;(async () => {
await  Ana.getData()
console.table(Ana.getConfidence(0, 100))
})();
