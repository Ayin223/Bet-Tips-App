 const outcome =
          matchWinner === "Draw"  && prediction === "Draw"
              ? "WON"
              : prediction === matchWinner
              ? "WON"
              : (prediction === `${storedMatch.homeTeam} wins or draw` ||
                prediction === `${storedMatch.awayTeam} wins or draw`) &&
                matchWinner === "Draw"
              ? "WON"
              :prediction === `Home or Away` &&  matchWinner != "Draw"
              ?"WON"
              : "LOST";