import axios from "axios";
import { leagueCodes } from "./leagueCodes.js";

const leagueKeys = Object.keys(leagueCodes);
const baseURL = "https://site.web.api.espn.com/apis/v2/sports/soccer/";

const leagueURL = leagueKeys.map(key => ({
 code: key,
 url: `${baseURL}${key}/standings?region=us&lang=en&contentorigin=espn&season=2025&sort=rank%3Aasc`
}));

export async function fetchStandings() {
 try {
  const response = await Promise.all(
   leagueURL.map(l =>
    axios
     .get(l.url)
     .then(res => ({ code: l.code, data: res.data }))
     .catch(() => null)
   )
  );

  const allLeagues = response.filter(r => r && r.data);
  
  // CORRECTED: Initialize as an object to key by league code
  const standingsData = {};

  allLeagues.forEach(league => {
   const children = league.data.children || [];
   if (!children.length) return;

   // CORRECTED: Initialize the array for the current league code
   if (!standingsData[league.code]) {
    standingsData[league.code] = [];
   }

   // loop through each group
   children.forEach(child => {
    const groupName = child.name || "Overall";
    const entries = child.standings?.entries || [];

    // loop through each team in the group
    entries.forEach(entry => {
     const teamName = entry.team.displayName;
     const id = entry.team.id;
     
     // CORRECTED: Convert to Number immediately for safe arithmetic
     const rank = Number(entry.stats.find(s => s.name === "rank")?.value);
     const points = Number(entry.stats.find(s => s.name === "points")?.value);
     const gamesPlayed = Number(entry.stats.find(s => s.name === "gamesPlayed")?.value);
     const goalsFor = Number(entry.stats.find(s => s.name === "pointsFor")?.value);
     const goalsAgainst = Number(entry.stats.find(s => s.name === "pointsAgainst")?.value);
     const goalsdiff = Number(entry.stats.find(s => s.name === "pointDifferential")?.value);
     const wins = Number(entry.stats.find(s => s.name === "wins")?.value);
     const losses = Number(entry.stats.find(s => s.name === "losses")?.value);
     const draws = Number(entry.stats.find(s => s.name === "ties")?.value);
     
     // Use numeric addition
     const totalGoals = goalsFor + goalsAgainst;
     
     // Check for division by zero
     const validGames = gamesPlayed > 0;

     // CORRECTED: Push to the array within the object, using league.code
     standingsData[league.code].push({
      leagueCode: league.code,
      team: teamName,
      standing: rank,
      points: points,
      teamID: id,
      gamesPlayed: gamesPlayed,
      totalGoals: totalGoals,
      goalsFor: goalsFor,
      goalsAgainst: goalsAgainst,
      goalDiff: goalsdiff,
      wins: wins,
      losses: losses,
      draws: draws,
      avgGoalsFor: validGames ? (goalsFor / gamesPlayed).toFixed(2) : null,
      avgGoalsAgainst: validGames ? (goalsAgainst / gamesPlayed).toFixed(2) : null,
      avgTotalGoals: validGames ? (totalGoals / gamesPlayed).toFixed(2) : null,
      winRate: validGames ? ((wins / gamesPlayed) * 100).toFixed(2) : null
     });
    });
   });
  });

  return standingsData; // CORRECTED: Return the object
 } catch (err) {
  console.error("Error fetching data:", err);
 } finally {
  console.log("✅Fetching standings completed");
 }
}

// await standings();