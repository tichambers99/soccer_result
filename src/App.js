import Match from './components/Match';
import './App.css';
import axios from 'axios';
import {Component} from 'react';

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
    //let round = this.state.fixtures[1].round.round_id;
    return(
      <div className="App">
        <h1>Ket qua thi dau vong { this.state.fixtures.length > 0 && this.state.fixtures[1].round.name } Ngoai Hang Anh</h1>
        {
          this.state.fixtures.length > 0 && this.state.fixtures.map((fixture, index) => <Match key = {index} logo1={fixture.home_team.logo} goal1={fixture.stats.home_score} logo2={fixture.away_team.logo} goal2={fixture.stats.away_score}/>)
        }
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
