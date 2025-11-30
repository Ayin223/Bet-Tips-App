import axios from "axios";
import { leagueCodes } from "./leagueCodes.js";


//const date = "20251016"; // your specific date
const baseURL = "https://site.api.espn.com/apis/site/v2/sports/soccer/";

// const tomorrow = new Date();
// tomorrow.setDate(tomorrow.getDate() + 1);
// const tomorrowDate = tomorrow.toISOString().slice(0, 10).replace(/-/g, "");

export async function fetchFixtures(date) {
    const leagueKeys = Object.keys(leagueCodes);
    const leagueURL = leagueKeys.map(key => ({
      code: key,
      url: `${baseURL}${key}/scoreboard?dates=${date}`
    }));

    const fixtures = [];

  try {
    const response = await Promise.all(
      leagueURL.map(l =>
        axios
          .get(l.url)
          .then(res => ({ code: l.code, data: res.data }))
          .catch(() => null)
      )
    );

    const allLeagues = response.filter(r => r && r.data && r.data.events);

    allLeagues.forEach(league => {
      const leagueName = leagueCodes[league.code];

      league.data.events.forEach(match => {
        const competition = match.competitions?.[0];
        const teams = competition?.competitors || [];

        const home = teams.find(t => t.homeAway === "home");
        const away = teams.find(t => t.homeAway === "away");

        // console.log(home.team.displayName)

      const odds = competition?.odds || {};

      // const odds =
      //   competition?.odds?.find(o => 
      //     o.homeTeamOdds?.moneyLine !== undefined && 
      //     o.awayTeamOdds?.moneyLine !== undefined &&
      //     o.drawOdds?.moneyLine !== undefined) ||
      //     competition?.odds?.[0] ||
      //   {};

        // console.log(`${JSON.stringify(odds.homeTeamOdds.value,null,2)}`)
        // console.log(`${competition.odds.homeTeamOdds.moneyLine} `)


          // Debugging 
        // const homeMoneyLine = odds?.homeTeamOdds?.value;
        // const awayMoneyLine = odds?.awayTeamOdds?.value;
        // const provider = odds?.provider?.name ?? "Unknown";

        // if (homeMoneyLine !== undefined && awayMoneyLine !== undefined) {
        //   console.log(`${provider}: ${homeMoneyLine} - ${awayMoneyLine}`);
        // } else {
        //   console.log(`${provider}: Odds not available`);
        // }

        // 🧮 Convert Moneyline to Decimal Odds
        const convertToDecimal = (moneyLine) => {
          if (moneyLine == null) return null;
          const val = Number(moneyLine);
          if (isNaN(val)) return null;
          return val > 0
            ? Number(((val / 100) + 1).toFixed(2))
            : Number(((100 / Math.abs(val)) + 1).toFixed(2));
        };

        let homeOdds =  null
        let awayOdds =  null
        let drawOdds =  null

        let homeTeamMoneyLineOdds = odds?.homeTeamOdds?.moneyLine || 
                                    odds.moneyline?.home?.open?.odds ||
                                    odds[0]?.moneyline?.home?.open?.odds
        let awayTeamMoneyLineOdds = odds?.awayTeamOdds?.moneyLine || 
                                    odds.moneyline?.away?.open?.odds ||
                                    odds[0]?.moneyline?.away?.open?.odds
        let drawMoneyLineOdds = odds?.drawOdds?.moneyLine || 
                                odds.moneyline?.draw?.open?.odds ||
                                odds[0]?.moneyline?.draw?.open?.odds

        let homeValueOdds = odds?.homeTeamOdds?.value
        let awayValueOdds = odds?.awayTeamOdds?.value
        let drawValueOdds = odds?.drawOdds?.value


        if(homeValueOdds !== undefined){
          homeOdds = homeValueOdds
        } else if(homeTeamMoneyLineOdds !== undefined){
          if(homeTeamMoneyLineOdds == "EVEN") {
            homeTeamMoneyLineOdds = +100
          }
          homeOdds = convertToDecimal(homeTeamMoneyLineOdds)
        } 
        
        if(awayValueOdds !== undefined){
          awayOdds = awayValueOdds
        } else if(awayTeamMoneyLineOdds !== undefined){
          if(awayTeamMoneyLineOdds == "EVEN") {
            awayTeamMoneyLineOdds = +100
          }
          awayOdds = convertToDecimal(awayTeamMoneyLineOdds)
        }
        
        if(drawValueOdds !== undefined){
          drawOdds = drawValueOdds
        } else if(drawMoneyLineOdds !== undefined){
          drawOdds = convertToDecimal(drawMoneyLineOdds)
        }


        // console.log(home?.team?.shortDisplayName, homeOdds)

        fixtures.push({
          league: leagueName,
          code: league.code,
          completed: competition?.status?.type?.completed,
          startDate: competition?.startDate.slice(0, 10),
          startTime: competition?.startDate.slice(11, 16),
          matchID: competition?.id,
          //provider: odds?.provider?.name ?? "Unknown",
          drawOdds,
          home: {
            name: home?.team?.shortDisplayName,
            score: home?.score,
            homeID: home?.id,
            form: home?.form,
            favorite: odds.homeTeamOdds?.favorite,
            homeOdds
          },
          away: {
            name: away?.team?.shortDisplayName,
            score: away?.score,
            awayID: away?.id,
            form: away?.form,
            favorite: odds.awayTeamOdds?.favorite,
            awayOdds
          }
        });
      });
    });

    return fixtures;
  } catch (err) {
    console.error("❌ Error fetching data:", err.message);
  } finally {
    console.log(`✅ Fetching fixtures completed: ${fixtures.length}`);
  }

  
}

// fetchFixtures(20251128)
// .then(s => 
//   console.log(s)
// );

