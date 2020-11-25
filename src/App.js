import MatchFinish from './components/MatchFinish';
import MatchNotFinish from './components/MatchNotFinish';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Component} from 'react';

import { Container, Row, Col } from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = { fixtures: [] };
  }

  async componentDidMount() {
    try{
      const response = await fetch(`https://api.npoint.io/9329b911b166f25cbef3`);
      const json = await response.json();
      this.setState({ fixtures: json.data });
    }catch(e){
      console.log(e);
    }
  }

  render(){
    return(
      <div className="App">
        <Container>
          <Row md='2'>
            <Col>
              <h1>Premier League</h1>
              <h3>Round {this.state.fixtures.length > 0 && this.state.fixtures[0].round.name}</h3>
              <Row md='2'>
                  <Col>
                    <div>Finished Match</div>
                    {
                      this.state.fixtures.length > 0 && this.state.fixtures.map((fixture, index) => <MatchFinish key = {index} fixture = {fixture}/>)
                      //this.state.fixtures.length > 0 && this.state.fixtures.map((fixture, index) => <Match key = {index} logo1={fixture.home_team.logo} goal1={fixture.stats.home_score} logo2={fixture.away_team.logo} goal2={fixture.stats.away_score} status={fixture.status}/>)
                    }
                  </Col>
                  <Col>
                    <div>Unstarted Match</div>
                    {
                      this.state.fixtures.length > 0 && this.state.fixtures.map((fixture, index) => <MatchNotFinish key = {index} fixture = {fixture}/>)
                      //this.state.fixtures.length > 0 && this.state.fixtures.map((fixture, index) => <Match key = {index} logo1={fixture.home_team.logo} goal1={fixture.stats.home_score} logo2={fixture.away_team.logo} goal2={fixture.stats.away_score} status={fixture.status}/>)
                    }
                  </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    )
    }
}

export default App;



 // componentDidMount() {
  //   fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=10`)
  //     .then(res => res.json())
  //     .then(json => this.setState({ data: json }));

  //   // axios.get('https://api.npoint.io/9329b911b166f25cbef3').then(function (response) {
  //   //   // handle success
  //   //   //console.log(response.data);
  //   //   fixtures = response.data.data;
  //   //   console.log(fixtures);
  //   // })
  // }

  // render(){
  // var fixtures = [];
  // <div className="App">
  //   <h1>Ket qua thi dau vong 37 Ngoai Hang Anh</h1>
  //   {
  //     fixtures.map((fixture, index) => <Match key = {index} logo1={fixture.home_team.logo} logo2={fixture.away_team.logo}/>)
  //   }
  // </div>
  // }
