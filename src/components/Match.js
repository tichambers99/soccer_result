import { render } from '@testing-library/react';
import React, {Component} from 'react';

class Match extends Component{
    render() {
        return(
            <div className="Match">
                <img src= {this.props.logo1} alt='Logo'></img>
                <img src= {this.props.logo2} alt='Logo'></img>
            </div>
            )
    }
}
export default Match; 