import MatchNotFinish from './components/MatchNotFinish';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Component} from 'react';

import { Container, Row, Col, Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
} from 'reactstrap';
import LeagueStanding from './components/LeagueStanding';
import MyModal from './components/MyModal';

const getData = async (seasonId, link) => {
  try {
    const response = await fetch(link);
    const json = await response.json();
    return json.data
  } catch(e){
    alert(e);
  }
}

const getTeamInfo = (data) => {
  let teamInfo = []
  for (const match of data) {
    const team1 = {
      team_id: match.home_team.team_id,
      team_name: match.home_team.name,
      team_logo: match.home_team.logo
    }
    const team2 = {
      team_id: match.away_team.team_id,
      team_name: match.away_team.name,
      team_logo: match.away_team.logo
    }

    teamInfo.push(team1, team2);
  }

  return teamInfo
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      seasonId: "352", // Premier League: 352, SeriA: 619, Budesliga: 496
      fixtures: [],
      teamInfo: [],
      isOpen: false
    };
  }

  componentDidMount() {
    const { seasonId } = this.state;

    const getSoccerData = async () => {
      const link = `https://api.npoint.io/9329b911b166f25cbef3`
      const data = await getData(seasonId, link);
      this.setState({ fixtures: data})
      
      this.setState({ teamInfo: getTeamInfo(data)})
    }
  
    getSoccerData()
  }

  componentDidUpdate(prevProps, prevState) {
    const { seasonId } = this.state;
    let link

   if (prevState.seasonId !== seasonId) {
    const getSoccerData = async () => {
      if (seasonId === "352") {
        link = `https://api.npoint.io/9329b911b166f25cbef3`
      }
      else if (seasonId === "619") {
        link = `https://api.npoint.io/0dad2d7410db2fd377ce`
      }
      else {
        link = `https://api.npoint.io/3d56bf5dcd584a13b4e5`
      }
      const data = await getData(seasonId, link);
      this.setState({ fixtures: data})
      this.setState({ teamInfo: getTeamInfo(data)})
    }
  
    getSoccerData() 
   }
  }

  handleChangeLeague = (e) => {
    this.setState({ seasonId: e.target.value })
  }

  render(){
    const { fixtures, seasonId, teamInfo, isOpen } = this.state

    return(
      <div className="App">
        <Container>
          <div className="navbar">
            <Navbar color="light" light expand="md" className="navbar-child">
              <NavbarBrand href="/">Home</NavbarBrand>
              <NavbarToggler onClick={() => this.setState({ isOpen: !isOpen})} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                <select 
                  class="form-select" 
                  aria-label="League"
                  defaultValue={seasonId}
                  onClick={this.handleChangeLeague}
                >
                  <option value="352">Premier League</option>
                  <option value="619">Seria</option>
                  <option value="496">Budesliga</option>
                </select>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
          <Row style={{ marginTop: "2rem"}}>
            <Col sm="4">
              {
                seasonId === "352" ? <h3>Premier League</h3> : 
                seasonId === "619" ? <h3>Seria</h3> :
                <h3>Budesliga</h3>
              }
              <h5>Round {fixtures && fixtures.length > 0 && fixtures[0].round.name}</h5>
              <Row md='2'>
                <Col>
                  <div>Finished Match</div>
                  {
                    fixtures && fixtures.length > 0 && fixtures.filter((fixture) => fixture.status.localeCompare('finished') === 0).map((fixture, index) =>
                    <MyModal keyId={index} fixture={fixture} />
                  )}
                </Col>
                <Col>
                  <div>Unstarted Match</div>
                  {
                    fixtures && fixtures.length > 0 && fixtures.map((fixture, index) => 
                    <MatchNotFinish key={index} fixture={fixture}/>)
                  }
                </Col>
              </Row>
            </Col>
            <Col sm="8">
              <div className="content">
                <h5>Matches Finish</h5>
                <p>Look to the left</p>
                <p>Click to see detail</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
              </div>
            </Col>
          </Row>

          <Row style={{ marginTop: "1rem"}}>
            <Col sm="4">
              <h5>League Standing</h5>
              <p>Look to the right</p>
              <p>Click to see detail</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
            </Col>
            <Col sm="8">
              <LeagueStanding teamInfo={teamInfo} seasonId={seasonId}/>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App;