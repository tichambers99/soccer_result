import React, { useEffect, useState } from 'react'

const getData = async (matchId, seasonId) => {
  const apiKeyLoi = 'a0aee410-2d7c-11eb-b0d1-731e2179da56'
	const apiKeyKhanh = 'e85426b0-2f0d-11eb-9a8e-51fcda634498'
	let link
	
	if (seasonId === 496) {
		link = `
	https://app.sportdataapi.com/api/v1/soccer/matches/${matchId}?apikey=${apiKeyKhanh}
	&season_id=${seasonId}
	`
	}
	else {
		link = `
	https://app.sportdataapi.com/api/v1/soccer/matches/${matchId}?apikey=${apiKeyLoi}
	&season_id=${seasonId}
	`
	}

  try {
    const response = await fetch(link);
    const json = await response.json();
    return json.data
  } catch(e){
    alert(e);
  }
}

export default function MyModal(props) {
  const { fixture } = props;
  const [dataMatch, setDataMatch] = useState({})

  useEffect( () => {
    const getMatch = async () => {
			const { match_id, season_id } = fixture
			const data = await getData(match_id, season_id)
			setDataMatch(data)
    }
    getMatch();
  }, [])

  const handleSetModal = () => {
    // setUpdate(!update)
    let modal = document.getElementById("modal-result")
    if (modal.classList.contains("inactive")) {
      modal.classList.remove("inactive");
      // Header
      let pKO = document.getElementById("kick-off-p")
      let pHT = document.getElementById("ht-p")
      let pFT = document.getElementById("ft-p")
      pKO.innerHTML = "Kick off: " + fixture.match_start;
      pHT.innerHTML = "Half-time score: " + fixture.stats.ht_score;
      pFT.innerHTML = "Full-time score: " + fixture.stats.ft_score;

      // Body
      // Home
      let h5HomeName = document.getElementById("home-name-h5");
      let pHomeCorner = document.getElementById("home-corner-p");
      let pHomeFoul = document.getElementById("home-foul-p");
      let pHomegoalAttemp = document.getElementById("home-goalAttemp-p");
      let pHomeOffside = document.getElementById("home-offside-p");
      let pHomeTotalShot = document.getElementById("home-totalShot-p");
      let pHomeYellowCard = document.getElementById("home-yellowCard-p");
      h5HomeName.innerHTML = fixture.home_team.name;
      if (dataMatch && dataMatch.match_statistics) {
        pHomeCorner.innerHTML = dataMatch.match_statistics[0].corners;
        pHomeFoul.innerHTML = dataMatch.match_statistics[0].fouls;
        pHomegoalAttemp.innerHTML = dataMatch.match_statistics[0].goal_attempts;
        pHomeOffside.innerHTML = dataMatch.match_statistics[0].offsides;
        pHomeTotalShot.innerHTML = dataMatch.match_statistics[0].shots_total;
        pHomeYellowCard.innerHTML = dataMatch.match_statistics[0].yellowcards;
      }

      // Away
      let h5AwayName = document.getElementById("away-name-h5");
      let pAwayCorner = document.getElementById("away-corner-p");
      let pAwayFoul = document.getElementById("away-foul-p");
      let pAwaygoalAttemp = document.getElementById("away-goalAttemp-p");
      let pAwayOffside = document.getElementById("away-offside-p");
      let pAwayTotalShot = document.getElementById("away-totalShot-p");
      let pAwayYellowCard = document.getElementById("away-yellowCard-p");
      h5AwayName.innerHTML = fixture.away_team.name;
      if (dataMatch && dataMatch.match_statistics) {
        pAwayCorner.innerHTML = dataMatch.match_statistics[1].corners;
        pAwayFoul.innerHTML = dataMatch.match_statistics[1].fouls;
        pAwaygoalAttemp.innerHTML = dataMatch.match_statistics[1].goal_attempts;
        pAwayOffside.innerHTML = dataMatch.match_statistics[1].offsides;
        pAwayTotalShot.innerHTML = dataMatch.match_statistics[1].shots_total;
        pAwayYellowCard.innerHTML = dataMatch.match_statistics[1].yellowcards;
      }
      
      modal.classList.add("active");
    }
  }

  const handleCloseModal = () => {
    // setUpdate(!update)
    let modal = document.getElementById("modal-result")
    modal.classList.remove("active");
    modal.classList.add("inactive");
  }
  
  return (
    <div style={{ margin: "1rem", backgroundColor: "#f3f0f0" }}>
      <div id="click" class="Match" onClick={handleSetModal}> 
        <img id="home-team-img" src={fixture.home_team.logo} alt='Logo'/>
        <span id="score-span" className="Score">{fixture.stats.home_score} - {fixture.stats.away_score}</span>
        <img id="away-team-img" src={fixture.away_team.logo} alt='Logo'/>
      </div>
      <div id="modal-result" className="modal inactive">
        <div class="modal-content">
          <span class="close" onClick={handleCloseModal}>&times;</span>
          <div class="modal-body">
            <div className="match-stats">
              <p id="kick-off-p"></p>
              <p id="ht-p"></p>
              <p id="ft-p"></p>
            </div>
            <div className="match-detail">
              <div className="match-title">
                <p>Corners:</p>
                <p>Fouls:</p>
                <p>Goal attempts:</p>
                <p>Offsides:</p>
                <p>Total shots:</p>
                <p>Yellow cards:</p>
              </div>
              <div className="match_statistics">
                <div className="match-team">
                  <p id="home-name-h5"></p>
                </div>
                {
                  dataMatch && dataMatch.match_statistics &&
                  <div>
                    <p id="home-corner-p"></p>
                    <p id="home-foul-p"></p>
                    <p id="home-goalAttemp-p"></p>
                    <p id="home-offside-p"></p>
                    <p id="home-totalShot-p"></p>
                    <p id="home-yellowCard-p"></p>
                  </div>
                }
              </div>
              <div className="match_statistics">
                <div className="match-team">
                  <p id="away-name-h5"></p>
                </div>
                {
                  dataMatch && dataMatch.match_statistics &&
                  <div>
                    <p id="away-corner-p"></p>
                    <p id="away-foul-p"></p>
                    <p id="away-goalAttemp-p"></p>
                    <p id="away-offside-p"></p>
                    <p id="away-totalShot-p"></p>
                    <p id="away-yellowCard-p"></p>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
