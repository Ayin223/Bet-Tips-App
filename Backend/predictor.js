import { mergerData } from "./app.js";
import { fetchFixtures } from "./fixtures.js";
import { fetchStandings } from "./standing.js";


const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowDate = tomorrow.toISOString().slice(0, 10).replace(/-/g, "");

const fixtures = await fetchFixtures(tomorrowDate);
const standings = await fetchStandings()
const combinedFixtures =  await mergerData(fixtures,standings)

const safeNum = (value) => Number(value) || 0;

export const analysis = () => {
  let totalTips = 0;
  let premiumTips = []
  let freeTips = []
  let version  = 0.2
  combinedFixtures
    .map(match => {
      const defaultOdds = 2.00
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
          homeTeamisFavorite = false
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
          awayTeamisFavorite = false
        },
        drawOdds,
      } = match;

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
      const pointDiff = Math.abs(safeNum(homePoints) - safeNum(awayPoints))

      const exclusionFactors =
        safeNum(homeOdds) < 1.30 ||
        safeNum(awayOdds) < 1.30 ||
        safeNum(homeGamesPlayed) < 5 ||
        safeNum(awayGamesPlayed) < 5 ||
        //Math.abs(safeNum(homePoints) - safeNum(awayPoints)) < 9 ||
        Math.abs(safeNum(numHomeForm) - safeNum(numAwayForm)) < 3;

      if (!matchStatus) {
        // if (exclusionFactors) {
        //   //console.log(`⛔ Skipped: ${homeTeam} vs ${awayTeam} | homeOdds=${homeOdds}, awayOdds=${awayOdds}, pdiff= ${Math.abs(numAwayForm - numHomeForm)}`);
        //   return null;
        // }

        let finalHomeOdds = 0
        let finalAwayOdds = 0
        let finalDrawOdds = 0

        if(homeTeamisFavorite){
            finalHomeOdds = homeOdds?? (defaultOdds - 0.5)
            finalAwayOdds = awayOdds?? (defaultOdds)
            finalDrawOdds = drawOdds ?? (defaultOdds + 1.00)
        }else if (awayTeamisFavorite){
            finalAwayOdds = awayOdds ?? (defaultOdds - 0.5)
            finalHomeOdds = homeOdds?? (defaultOdds)
            finalDrawOdds = drawOdds ?? (defaultOdds + 1.00)
        } else{
            finalAwayOdds = awayOdds ?? (defaultOdds)
            finalHomeOdds = homeOdds?? (defaultOdds - 0.5)
            finalDrawOdds = drawOdds ?? (defaultOdds + 1.00)
        }

        totalTips++;

        let prediction;
        let predictedOdds;
        let isPremiumTip = true;
        let confidence = 0

        const calculateDoubleChanceOdds = (winOdds, drawOdds) => {
            const winProb = 1 / safeNum(winOdds);
            const drawProb = 1 / safeNum(drawOdds);
            
            if (winProb === 0 || drawProb === 0) return 0;

            const doubleChanceProb = winProb + drawProb;

            return parseFloat((1 / doubleChanceProb).toFixed(2));
        };

        if(pointDiff >= 15){
            if(homeTeamisFavorite && ((numHomeForm - numAwayForm) >= 7)){
                prediction = `${homeTeam} wins`,
                predictedOdds = finalHomeOdds
                confidence = 0.90
            }else if (homeTeamisFavorite && ((numHomeForm - numAwayForm) >= 0)) {
                prediction = `${homeTeam} wins or draw`,
                predictedOdds = calculateDoubleChanceOdds(finalHomeOdds, finalDrawOdds)
                confidence = 0.85
            }else if (awayTeamisFavorite && ((numHomeForm - numAwayForm) >= 7)){
                prediction = `${awayTeam} wins`,
                predictedOdds = finalAwayOdds
                confidence = 0.90
            }else if (awayTeamisFavorite && ((numHomeForm - numAwayForm) >= 0)){
                prediction = `${awayTeam} wins or draw`,
                predictedOdds = calculateDoubleChanceOdds(finalAwayOdds, finalDrawOdds)
                confidence = 0.85
            }else {
                prediction = `Home or Away`,
                predictedOdds = calculateDoubleChanceOdds(finalHomeOdds,finalAwayOdds)
                confidence = 0.80
            }
          
        } else if (pointDiff < 15) {
            if(homeTeamisFavorite && ((numHomeForm - numAwayForm) >= 7)){
                prediction = `${homeTeam} wins`,
                predictedOdds = finalHomeOdds
                confidence = 0.75
            }else if (homeTeamisFavorite && ((numHomeForm - numAwayForm) >= 0)) {
                prediction = `${homeTeam} wins or draw`,
                predictedOdds = calculateDoubleChanceOdds(finalHomeOdds, finalDrawOdds)
                confidence = 0.70
            }else if (awayTeamisFavorite && ((numHomeForm - numAwayForm) >= 7)){
                prediction = `${awayTeam} wins`,
                predictedOdds = finalAwayOdds
                confidence = 0.75
            }else if (awayTeamisFavorite && ((numHomeForm - numAwayForm) >= 0)){
                prediction = `${awayTeam} wins or draw`,
                predictedOdds = calculateDoubleChanceOdds(finalAwayOdds,finalDrawOdds)
                confidence = 0.70
            }else {
                prediction = `Home or Away`,
                predictedOdds = calculateDoubleChanceOdds(finalHomeOdds,finalAwayOdds)
                confidence = 0.65
            }
        } else {
            return null
        }
        
        const tip = {
          version,
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
          homeTeamisFavorite,
          awayTeamisFavorite,
          awayOdds,
          drawOdds,
          confidence: parseFloat(confidence.toFixed(2)),
          isPremium: isPremiumTip,
          outcome: "PENDING",
          homeScore: null,
          awayScore: null,
          homePoints,
          numHomeForm,
          homeForm,
          HomeStanding: homeStanding, 
          HomeGamesPlayed: safeNum(homeGamesPlayed),
          awayPoints,
          numAwayForm,
          awayForm,
          AwayStanding: awayStanding, 
          AwayGamesPlayed: safeNum(awayGamesPlayed),
          avgHomeGoalsScored, avgHomeGoalsConceded, homeWinRate,
          avgAwayGoalsScored, avgAwayGoalsConceded, awayWinRate,
        };

        
        premiumTips.push(tip)
        
      } else {
          return match;
      }
    })
    .filter(Boolean);

  premiumTips.sort((a,b) => b.confidence - a.confidence)


  const sortedTips = premiumTips

  premiumTips = sortedTips.slice(0,8)
  freeTips = sortedTips.slice(9,19).map(tip => ({... tip, isPremium: false}))
  freeTips.sort((a,b) => b.confidence - a.confidence)

  const uploadTips = [...premiumTips, ...freeTips]

  console.log(`Total tips generated by new model: ${totalTips}`);
  console.log(`Tips to be uploaded: ${uploadTips.length}`);
 return {uploadTips};
};

// console.log(analysis());


