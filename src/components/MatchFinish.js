import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import './Match.css'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

const getData = async (matchId, seasonId) => {
  const apiKeyLoi = 'a0aee410-2d7c-11eb-b0d1-731e2179da56'
	const apiKeyKhanh = 'e85426b0-2f0d-11eb-9a8e-51fcda634498'
	let link
	
	if (seasonId === 496) {
		link = `
	https://app.sportdataapi.com/api/v1/soccer/matches/${matchId}?apikey=${apiKeyKhanh}
	&season_id=${seasonId}
	`
	}
	else {
		link = `
	https://app.sportdataapi.com/api/v1/soccer/matches/${matchId}?apikey=${apiKeyLoi}
	&season_id=${seasonId}
	`
	}

  try {
    const response = await fetch(link);
    const json = await response.json();
    return json.data
  } catch(e){
    alert(e);
  }
}

class MatchFinish extends Component {
	constructor() {
		super();
		this.state = {
			dataMatch: {},
			modal: false
		}
	}

	setModal= () => {
		const getMatch = async () => {
			const { match_id, season_id } = this.props.fixture
			const data = await getData(match_id, season_id)
			this.setState({dataMatch: data})
		}

		getMatch();
		this.setState({
			modal: !this.state.modal
		})
	}

	render() {
		let { fixture } = this.props;
		const { dataMatch } = this.state;
		// const { match_statistics } = dataMatch
		let className = 'Match m-1 p-1 align-items-center justify-content-center';
		if(fixture.status.localeCompare('finished') === 0){
			className += ' Match-finish';
			return(
				<div>			
					<Modal isOpen={this.state.modal} toggle={this.setModal}>
						<ModalBody>
							<div className="match-stats">
								<p>Kick off: {fixture.match_start}</p>
								<p>Half-time score: {fixture.stats.ht_score}</p>
								<p>Full-time score: {fixture.stats.ft_score}</p>
							</div>
							<Row>
								<Col xs="4" className="match-title">
									<p>Corners:</p>
									<p>Fouls:</p>
									<p>Goal attempts:</p>
									<p>Offsides:</p>
									<p>Total shots:</p>
									<p>Yellow cards:</p>
								</Col>
								<Col xs={{ size: 4}} className="match_statistics">
									<div className="match-team">
										<img src={fixture.home_team.logo} alt='Logo'/>
										<h6>{fixture.home_team.name}</h6>
									</div>
									{
										dataMatch && dataMatch.match_statistics &&
										<div>
											<p>{dataMatch.match_statistics[0].corners}</p>
											<p>{dataMatch.match_statistics[0].fouls}</p>
											<p>{dataMatch.match_statistics[0].goal_attempts}</p>
											<p>{dataMatch.match_statistics[0].offsides}</p>
											<p>{dataMatch.match_statistics[0].shots_total}</p>
											<p>{dataMatch.match_statistics[0].yellowcards}</p>
										</div>
									}
								</Col>
								<Col xs="4" className="match_statistics">
									<div className="match-team">
										<img src={fixture.away_team.logo} alt='Logo'/>
										<h6>{fixture.away_team.name}</h6>
									</div>
									{
										dataMatch && dataMatch.match_statistics &&
										<div>
											<p>{dataMatch.match_statistics[1].corners}</p>
											<p>{dataMatch.match_statistics[1].fouls}</p>
											<p>{dataMatch.match_statistics[1].goal_attempts}</p>
											<p>{dataMatch.match_statistics[1].offsides}</p>
											<p>{dataMatch.match_statistics[1].shots_total}</p>
											<p>{dataMatch.match_statistics[1].yellowcards}</p>
										</div>
									}
								</Col>
							</Row>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={this.setModal}>Oke</Button>
						</ModalFooter>
					</Modal>
					
					<Row className= {className} xs='3' onClick={this.setModal}> 
						<img src= {fixture.home_team.logo} alt='Logo'/>
						<span className="Score">{fixture.stats.home_score} - {fixture.stats.away_score}</span>
						<img src= {fixture.away_team.logo} alt='Logo'/>
					</Row>
				</div>
			)
		} 
		else return(<span></span>);
	}
}
export default MatchFinish; 