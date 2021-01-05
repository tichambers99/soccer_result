import React, { useEffect } from 'react'

export default function LeagueStandingModal(props) {
  const { teamMatched, isOpen, handleSetModalFalse } = props;

  useEffect(() => {
    let modal = document.getElementById("modal-team-detail")
    if (isOpen) {
      modal.classList.remove("inactive");
      let h3Detail = document.getElementById("detail-h3");
      // Body
      // Home
      let pHomeWon = document.getElementById("home-won-p");
      let pHomeDraw = document.getElementById("home-draw-p");
      let pHomeLost = document.getElementById("home-lost-p");
      let pHomeScored = document.getElementById("home-scored-p");
      let pHomeAgainst = document.getElementById("home-against-p");
      if (teamMatched && teamMatched.home) {
        h3Detail.innerHTML = "Detail of " + teamMatched.team_name;
        pHomeWon.innerHTML = teamMatched.home.won;
        pHomeDraw.innerHTML = teamMatched.home.draw;
        pHomeLost.innerHTML = teamMatched.home.lost;
        pHomeScored.innerHTML = teamMatched.home.goals_scored;
        pHomeAgainst.innerHTML = teamMatched.home.goals_against;
      }
      
      // Away
      let pAwayWon = document.getElementById("away-won-p");
      let pAwayDraw = document.getElementById("away-draw-p");
      let pAwayLost = document.getElementById("away-lost-p");
      let pAwayScored = document.getElementById("away-scored-p");
      let pAwayAgainst = document.getElementById("away-against-p");
      if (teamMatched && teamMatched.away) {
        pAwayWon.innerHTML = teamMatched.away.won;
        pAwayDraw.innerHTML = teamMatched.away.draw;
        pAwayLost.innerHTML = teamMatched.away.lost;
        pAwayScored.innerHTML = teamMatched.away.goals_scored;
        pAwayAgainst.innerHTML = teamMatched.away.goals_against;
      }
      
      modal.classList.add("active");
    }
  }, [isOpen])

  const handleCloseModal = () => {
    let modal = document.getElementById("modal-team-detail")
    modal.classList.remove("active");
    modal.classList.add("inactive");
    handleSetModalFalse();
  }
  
  return (
    <div style={{ margin: "1rem", backgroundColor: "#f3f0f0" }}>
      <div id="modal-team-detail" className="modal inactive">
        <div class="modal-content">
          <span class="close" onClick={handleCloseModal}>&times;</span>
          <div className="team-detail-title">
            <h3 id="detail-h3">Detail</h3>
          </div>
          <div class="modal-body modal-body-team-detail">
            <div xs="4" className="team-title">
              <p>Won:</p>
              <p>Draw:</p>
              <p>Lost:</p>
              <p>Goals score:</p>
              <p>Goals against:</p>
            </div>
            <div xs={{ size: 4}} className="team_statistics">
              <div>
                <h5>Home</h5>
              </div>                            
              <div>
                <p id="home-won-p"></p>
                <p id="home-draw-p"></p>
                <p id="home-lost-p"></p>
                <p id="home-scored-p"></p>
                <p id="home-against-p"></p>
              </div>                                    
            </div>

            <div xs="4" className="team_statistics">
              <div>
                <h5>Away</h5>
              </div>
              <div>
                <p id="away-won-p"></p>
                <p id="away-draw-p"></p>
                <p id="away-lost-p"></p>
                <p id="away-scored-p"></p>
                <p id="away-against-p"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
