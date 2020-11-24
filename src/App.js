import Match from './components/Match';
import arsenal from './logo.svg'
import './App.css';

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //       >
  //         Hello world
  //       </a>
  //     </header>
  //   </div>
  // );

  let fixtures = [
    {
      home: {
        name: 'Arsenal',
        logo: 'https://cdn.sportdataapi.com/images/soccer/teams/100/18.png',
        goal: 5
      },
      away: {
        name: 'Manchester United',
        logo: 'https://cdn.sportdataapi.com/images/soccer/teams/100/19.png',
        goal: 1
      }
    },
    {
      home: {
        name: 'Watford',
        logo: 'https://cdn.sportdataapi.com/images/soccer/teams/100/11.png',
        goal: 2
      },
      away: {
        name: 'Brighton&Hole Albilon',
        logo: 'https://cdn.sportdataapi.com/images/soccer/teams/100/12.png',
        goal: 1
      }
    }
  ]
    
  return(
    <div className="App">
      <h1>Ket qua thi dau vong 37 Ngoai Hang Anh</h1>
      {/* <Match logo1 = 'https://cdn.sportdataapi.com/images/soccer/teams/100/18.png' logo2 = 'https://cdn.sportdataapi.com/images/soccer/teams/100/19.png'/>
      <Match logo1 = 'https://cdn.sportdataapi.com/images/soccer/teams/100/11.png' logo2 = 'https://cdn.sportdataapi.com/images/soccer/teams/100/12.png'/> */}

      {
        fixtures.map((fixture) => <Match logo1={fixture.home.logo} goal1={fixture.home.goal} logo2={fixture.away.logo} goal2={fixture.away.goal}/>)
      }
    </div>
  )
}

export default App;
