import React, {Component} from 'react';
import {Row} from 'reactstrap';
import './Match.css'

class MatchNotFinish extends Component{
  render() {
    let { fixture } = this.props;
    
    let className = 'Match m-1 p-1 align-items-center justify-content-center';
    if(fixture.status.localeCompare('finished') !== 0){
      className += ' Match-finish';

      return(
        <Row className={className} xs='3'> 
          <img src= {fixture.home_team.logo} alt='Logo'></img>
          <span className="Score">{fixture.stats.home_score} - {fixture.stats.away_score}</span>
          <img src= {fixture.away_team.logo} alt='Logo'></img>
        </Row>
      )
    } else 
    return(<span></span>);
  }
}
export default MatchNotFinish; 