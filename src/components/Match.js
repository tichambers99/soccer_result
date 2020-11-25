import { render } from '@testing-library/react';
import React, {Component} from 'react';
import './Match.css'

class Match extends Component{
    render() {
        let { fixture } = this.props;
        let className = 'Match';
        if(fixture.status.localeCompare('finished') == 0){
            className += ' Match-finish';
        }
        return(
            <div className= {className} > 
                <img src= {fixture.home_team.logo} alt='Logo'></img>
                <span className="Score">{fixture.stats.home_score} - {fixture.stats.away_score}</span>
                <img src= {fixture.away_team.logo} alt='Logo'></img>
                <span>{fixture.status}</span>
                <hr/>
            </div>
            )
    }
}
export default Match; 