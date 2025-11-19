import { fetchStandings } from "./standing.js";
import { fetchFixtures } from "./fixtures.js";


export const mergerData = (fixturesData, standingData) => {


  const mergedResults = fixturesData.map(match => {
    
    const fixtureLeagueCode = match.code.trim(); 
    
    const currentLeagueTeams = standingData[fixtureLeagueCode];
    
    if (!currentLeagueTeams) {
      console.log(`${fixtureLeagueCode} != ${match.code} `)
      return null; 
    }

    const homeStanding = currentLeagueTeams.find(
      s => String(s.teamID) === String(match.home.homeID)
    );
    const awayStanding = currentLeagueTeams.find(
      s => String(s.teamID) === String(match.away.awayID)
    );
    
    // if (!homeStanding || !awayStanding) {
    //   return null;
    // }

    // --- Data Construction ---
    return {
      home: {
        id: match.home.homeID,
        name: match.home.name,
        score: match.home.score,
        homeOdds: match.home.homeOdds,
        homeTeamisFavorite: match.home.favorite,
        standing: homeStanding?.standing || null, 
        points: homeStanding?.points || null,
        gamesPlayed: homeStanding?.gamesPlayed || null,
        totalGoals: homeStanding?.totalGoals || null,
        goalsFor: homeStanding?.goalsFor || null,
        goalsAgainst: homeStanding?.goalsAgainst || null,
        goalDiff: homeStanding?.goalDiff || null, 
        wins: homeStanding?.wins || null, 
        losses: homeStanding?.losses || null, 
        draws: homeStanding?.draws || null, 
        homeForm: match.home.form,
        avgGoalsFor: homeStanding?.avgGoalsFor || null,
        avgGoalsAgainst: homeStanding?.avgGoalsAgainst || null,
        avgTotalGoals: homeStanding?.avgTotalGoals || null,
        winRate: homeStanding?.winRate || null,
      },
      away: {
        id: match.away.awayID,
        name: match.away.name,
        score: match.away.score,
        awayOdds: match.away.awayOdds,
        awayTeamisFavorite: match.away.favorite,
        // Properties are guaranteed to be from the correct league
        standing: awayStanding?.standing || null, 
        points: awayStanding?.points || null,
        gamesPlayed: awayStanding?.gamesPlayed || null,
        totalGoals: awayStanding?.totalGoals || null,
        goalsFor: awayStanding?.goalsFor || null,
        goalsAgainst: awayStanding?.goalsAgainst || null,
        goalDiff: awayStanding?.goalDiff || null, 
        wins: awayStanding?.wins || null, 
        losses: awayStanding?.losses || null, 
        draws: awayStanding?.draws || null,
        awayForm: match.away.form,
        avgGoalsFor: awayStanding?.avgGoalsFor || null,
        avgGoalsAgainst: awayStanding?.avgGoalsAgainst || null,
        avgTotalGoals: awayStanding?.avgTotalGoals || null,
        winRate: awayStanding?.winRate || null,
      },
      league: match.league,
      completed: match.completed,
      matchDate: match.startDate,
      matchTime: match.startTime,
      drawOdds: match.drawOdds,
      matchID: match.matchID
    };
  }).filter(Boolean);
  
  console.log(`✅ ${mergedResults.length} fixtures combined`)
  return mergedResults;
};

// const tomorrow = new Date();
// tomorrow.setDate(tomorrow.getDate() + 1);
// const tomorrowDate = tomorrow.toISOString().slice(0, 10).replace(/-/g, "");
// //console.log(tomorrowDate)


//console.log(combinedFixtures)