import { render } from '@testing-library/react';
import React, {Component} from 'react';

class Match extends Component{
    render() {
        return(
            <div className="Match" > 
                <img src= {this.props.logo1} alt='Logo' style = {{height: '50%'}}></img>
                <span style = {{fontSize: '30px'}}>{this.props.goal1} - {this.props.goal2}</span>
                <img src= {this.props.logo2} alt='Logo' style = {{height: '50%'}}></img>
            </div>
            )
    }
}
export default Match; 