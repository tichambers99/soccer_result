import { render } from '@testing-library/react';
import React, {Component} from 'react';

class Match extends Component{
    render() {
        return(
            <div className="Match">
                <img src='https://cdn.sportdataapi.com/images/soccer/teams/100/18.png' alt='Logo'></img>
                <img src='https://cdn.sportdataapi.com/images/soccer/teams/100/19.png' alt='Logo'></img>
            </div>
            )
    }
}
export default Match; 