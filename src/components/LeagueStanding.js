import React, { useState, useEffect } from 'react'
import LeagueStandingModal from './LeagueStandingModal';

const LeagueStanding = (props) => {
  const [standingData, setStandingData] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [teamMatched, setTeamMatched] = useState({});

  useEffect(() => {
    (async () => {
      let link
      if (props.seasonId === "352") {
        link = `https://api.npoint.io/d2a499aff6b8408e9151`
      }
      else if (props.seasonId === "619") {
        link = `https://api.npoint.io/5e1f804de5e0475f65ea`
      }
      else {
        link = `https://api.npoint.io/ff7f6be651bed85440a9`
      }
      try {
        const response = await fetch(link);
        const json = await response.json();
        const { teamInfo } = props
        const editedStanding = json.data.standings.map((teamStanding, key) => {
          for (const team of teamInfo) {
            if (teamStanding.team_id === team.team_id) {
              return {
                ...teamStanding,
                team_name: team.team_name,
                team_logo: team.team_logo,
              }
            }
          }
        })
        editedStanding.sort((a, b) => {
          if (b.points - a.points > 0) 
            return 1;
          else if (b.points - a.points < 0) {
            return -1;
          }
          else {
            if (b.overall.goals_diff - a.overall.goals_diff > 0) {
              return 1;
            }
            else if (b.overall.goals_diff - a.overall.goals_diff < 0) {
              return -1;
            }
            else return 0;
          }
        })
        
        setStandingData(editedStanding)
      } catch(e){
        alert(e);
      }
    })()
  }, [props])

  const handleModal = (e, teamId) => {
    for (const team of standingData) {
      if (team && team.team_id === teamId) {
        setTeamMatched(team)
        break;
      }
    }

    setIsOpenModal(!isOpenModal);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Standing</th>
            <th>Club</th>
            <th>Game played</th>
            <th>Win</th>
            <th>Draw</th>
            <th>Lost</th>
            <th>Diffence</th>
            <th>Point</th>
          </tr>
        </thead>
        <tbody className="team-row">
          {
            standingData.map((team, key) => {
              if (team) {
                const { team_name, points } = team
                const { games_played, won, draw, lost, goals_diff } = team.overall
                return (
                  <tr key={key} onClick={(e, teamId=team.team_id) => handleModal(e, teamId)}>
                    <th scope="row">{key+1}</th>
                    <td>{team_name}</td>
                    <td>{games_played}</td>
                    <td>{won}</td>
                    <td>{draw}</td>
                    <td>{lost}</td>
                    <td>{goals_diff}</td>
                    <td>{points}</td>
                  </tr>
                )
              }
            })
          }
        </tbody>
      </table>

      <LeagueStandingModal isOpen={isOpenModal} teamMatched={teamMatched} handleSetModalFalse={() => setIsOpenModal(false)}/>

      {/* <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalBody>
          <div className="team-detail-title">
            <h3>Detail</h3>
          </div>
          <Row>
            <Col xs="4" className="team-title">
              <p>Won:</p>
              <p>Draw:</p>
              <p>Lost:</p>
              <p>Goals score:</p>
              <p>Goals against:</p>
            </Col>
            <Col xs={{ size: 4}} className="team_statistics">
              <div>
                <h5>Home</h5>
              </div>                            
              {
                teamMatched && teamMatched.home &&
                <div>
                  <p>{teamMatched.home.won}</p>
                  <p>{teamMatched.home.draw}</p>
                  <p>{teamMatched.home.lost}</p>
                  <p>{teamMatched.home.goals_scored}</p>
                  <p>{teamMatched.home.goals_against}</p>
                </div>
              }                           
            </Col>
            <Col xs="4" className="team_statistics">
              <div>
                <h5>Away</h5>
              </div>
             {
               teamMatched && teamMatched.away &&
               <div>
                <p>{teamMatched.away.won}</p>
                <p>{teamMatched.away.draw}</p>
                <p>{teamMatched.away.lost}</p>
                <p>{teamMatched.away.goals_scored}</p>
                <p>{teamMatched.away.goals_against}</p>
              </div>
             }
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setModal(!modal)}>Oke</Button>
        </ModalFooter>
      </Modal> */}
    </div>
  )
}

export default LeagueStanding;