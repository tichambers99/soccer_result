import Match from './components/Match';
import './App.css';
import axios from 'axios';
import {Component} from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = { fixtures: {} };
  }

  async componentDidMount() {
    const response = await fetch(`https://api.npoint.io/9329b911b166f25cbef3`);
    const json = await response.json();
    this.setState({ fixtures: json });
    console.log(this.state.fixtures.data);
    console.log(typeof(this.state.fixtures.data));
  }

  render(){
    return(
      
      <div className="App">
        <h1>Ket qua thi dau vong 37 Ngoai Hang Anh</h1>
        {
          //this.state.fixtures.data.map((fixture, index) => <Match key = {index} logo1={fixture.home_team.logo} logo2={fixture.away_team.logo}/>)
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
