import { mergerData } from "./app.js";
import { fetchFixtures } from "./fixtures.js";
import { fetchStandings } from "./standing.js";


const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowDate = tomorrow.toISOString().slice(0, 10).replace(/-/g, "");

const fixtures = await fetchFixtures(tomorrowDate);
const standings = await fetchStandings()
const combinedFixtures =  await mergerData(fixtures,standings)

const W_RATE = 0.40;    
const W_POINT = 0.20;
const W_GF = 0.15;
const W_GA = 0.10;
const W_FORM = 0.15;
const DRAW_THRESHOLD = 0.10;
const MAX_POINT = 20;
const MAX_FORM_SCORE = 15;

const safeNum = (value) => Number(value) || 0;

let totalTips = 0;


export const analysis = () => {
  let premiumTips = []
  let freeTips = []
  const validTips = combinedFixtures
    .map(match => {
      const {
        completed: matchStatus,
        matchDate,
        matchTime,
        matchID,
        league,
        home: {
          name: homeTeam,
          standing: homeStanding,
          gamesPlayed: homeGamesPlayed,
          homeOdds,
          avgGoalsFor: avgHomeGoalsScored,
          avgGoalsAgainst: avgHomeGoalsConceded,
          winRate: homeWinRate,
          points: homePoints,
          homeForm,
        },
        away: {
          name: awayTeam,
          standing: awayStanding,
          gamesPlayed: awayGamesPlayed,
          awayOdds,
          avgGoalsFor: avgAwayGoalsScored,
          avgGoalsAgainst: avgAwayGoalsConceded,
          winRate: awayWinRate,
          points: awayPoints,
          awayForm,
        },
        drawOdds,
      } = match;

      const numHomePoints = safeNum(homePoints);
      const numAwayPoints = safeNum(awayPoints);
      const numHomeWinRate = safeNum(homeWinRate) / 100; // Normalize 0-1
      const numAwayWinRate = safeNum(awayWinRate) / 100; // Normalize 0-1
      const numHomeGoalsScored = safeNum(avgHomeGoalsScored);
      const numAwayGoalsScored = safeNum(avgAwayGoalsScored);
      const numHomeGoalsConceded = safeNum(avgHomeGoalsConceded);
      const numAwayGoalsConceded = safeNum(avgAwayGoalsConceded);

      const W_SCORE = 3;
      const D_SCORE = 1;
      const L_SCORE = 0;

      const calculateFormScore = (formString) => {
        return formString.split("").reduce((acc, result) => {
          if (result === "W") return acc + W_SCORE;
          if (result === "D") return acc + D_SCORE;
          return acc + L_SCORE;
        }, 0);
      };

      const numHomeForm = calculateFormScore(homeForm);
      const numAwayForm = calculateFormScore(awayForm);

      const exclusionFactors =
        safeNum(homeOdds) < 1.50 ||
        safeNum(awayOdds) < 1.50 ||
        safeNum(homeGamesPlayed) < 1 ||
        safeNum(awayGamesPlayed) < 1
        // Math.abs(safeNum(homePoints) - safeNum(awayPoints)) < 9 ||
        //Math.abs(safeNum(numHomeForm) - safeNum(numAwayForm)) < 6;

      if (!matchStatus) {
        if (exclusionFactors) {
          //console.log(`⛔ Skipped: ${homeTeam} vs ${awayTeam} | homeOdds=${homeOdds}, awayOdds=${awayOdds}, pdiff= ${Math.abs(numAwayForm - numHomeForm)}`);
          return null;
        }

        totalTips++;

        const normalizedHomePoints = Math.max(0, MAX_POINT - numHomePoints) / MAX_POINT;
        const normalizedAwayPoints = Math.max(0, MAX_POINT - numAwayPoints) / MAX_POINT;

        const normalizedHomeForm = numHomeForm / MAX_FORM_SCORE;
        const normalizedAwayForm = numAwayForm / MAX_FORM_SCORE;

        

        // Calculate Score: S = (W_RATE*WinRate) + (W_POINT*NormPoints) + (W_GF*GF) - (W_GA*GA)
        // Note: GF/GA metrics are used directly as modifiers.
        const scoreHome =
            (W_RATE * numHomeWinRate) +
            (W_POINT * normalizedHomePoints) +
            (W_FORM * normalizedHomeForm) +
            (W_GF * numHomeGoalsScored) -
            (W_GA * numHomeGoalsConceded);

        const scoreAway =
            (W_RATE * numAwayWinRate) +
            (W_POINT * normalizedAwayPoints) +
            (W_FORM * normalizedAwayForm) +
            (W_GF * numAwayGoalsScored) -
            (W_GA * numAwayGoalsConceded);

        const scoreDiff = scoreHome - scoreAway;

        let prediction;
        let predictedOdds;

        if (Math.abs(scoreDiff) < DRAW_THRESHOLD) {
          prediction = 'Draw';
          predictedOdds = safeNum(drawOdds);
        } else if (scoreDiff > 0) {
          prediction = `${homeTeam} wins`;
          predictedOdds = safeNum(homeOdds);
        } else {
          prediction = `${awayTeam} wins`;
          predictedOdds = safeNum(awayOdds);
        }

        const isPremiumTip = Math.abs(scoreDiff) > (DRAW_THRESHOLD * 2);

        let confidence = 0.50 + Math.min(0.35, Math.abs(scoreDiff * 0.5)); 
        if (isPremiumTip) {
            confidence += 0.1;
        }
        confidence = Math.min(0.90, confidence);


        // console.log(`
        //              ${homeTeam} vs ${awayTeam}
        //              Prediction: ${prediction}
        //              Premium: ${isPremiumTip}
        //              Confidence: ${(confidence).toFixed(2)}
        //              ..............................
        //              H_WINRATE: ${(numHomeWinRate).toFixed(2)}
        //              H_POINTS: ${numHomePoints}
        //              H_FORM: ${numHomeForm}
        //              H_GF: ${numHomeGoalsScored}
        //              H_GA: ${numHomeGoalsConceded}
        //              H_PLAYED: ${homeGamesPlayed}
        //              ..............................
        //              A_WINRATE: ${(numAwayWinRate).toFixed(2)}
        //              A_POINTS: ${numAwayPoints}
        //              A_FORM: ${numAwayForm}
        //              A_GF: ${numAwayGoalsScored}
        //              A_GA: ${numAwayGoalsConceded}
        //              A_PLAYED: ${awayGamesPlayed}
        //              `)
        
        const tip = {
          league,
          matchDate,
          matchTime,
          matchID,
          homeTeam,
          awayTeam,
          status: matchStatus,
          prediction,
          odds: predictedOdds,
          homeOdds,
          awayOdds,
          drawOdds,
          confidence: parseFloat(confidence.toFixed(2)),
          isPremium: isPremiumTip,
          outcome: "PENDING",
          homeScore: null,
          awayScore: null,
          homePoints,
          numHomeForm,
          HomeStanding: homeStanding, 
          HomeGamesPlayed: safeNum(homeGamesPlayed),
          awayPoints,
          numAwayForm,
          AwayStanding: awayStanding, 
          AwayGamesPlayed: safeNum(awayGamesPlayed),
          avgHomeGoalsScored, avgHomeGoalsConceded, homeWinRate,
          avgAwayGoalsScored, avgAwayGoalsConceded, awayWinRate,
        };

        if(tip.isPremium){
          premiumTips.push(tip)
        }else{
          freeTips.push(tip)
        }
      } else {
          return match;
      }
    })
    .filter(Boolean);

  premiumTips.sort((a,b) => b.confidence - a.confidence)
  freeTips.sort((a,b) => b.confidence - a.confidence)

  premiumTips = premiumTips.slice(0,8)
  freeTips = freeTips.slice(0,8)
  const uploadTips = [...premiumTips, ...freeTips]

  console.log(`Total tips generated by new model: ${totalTips}`);
 return {uploadTips};
};

// console.log(analysis().uploadTips.isPremium);



