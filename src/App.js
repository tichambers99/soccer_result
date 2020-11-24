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
    
  return(
    <div className="App">
      <h1>Ket qua thi dau vong 37 Ngoai Hang Anh</h1>
      <Match/>
    </div>
  )
}

export default App;
