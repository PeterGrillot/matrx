import React, { Component } from 'react';
import styled from 'styled-components';

// Needed to get Store!
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

const ScoreArea = styled.section`
	display: flex;
	padding: 1rem;
	background: rgba(255,255,255,0.3);
	width: 30rem;
	margin: auto;
`

class Scoreboard extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ScoreArea className="Scoreboard">Score: {this.props.score}</ScoreArea>
		);
	}
}

function mapStateToProps(state) {
  return { score: state.score }
}
function mapDispachToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Scoreboard);
