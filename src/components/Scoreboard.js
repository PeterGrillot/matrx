import React, { Component } from 'react';

// Needed to get Store!
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

class Scoreboard extends Component {

	constructor(props) {
		super(props);
		this.updateScore = this.updateScore.bind(this)
		// const { dispatch } = props;
		// this.boundActionCreators = bindActionCreators(Actions, dispatch)
		// let action = Actions.updateScore('About');
		// dispatch(action);
	}
	updateScore(){
		// const { dispatch } = this.props;
		this.props.updateScore(this.props.score, 100);
	}
	render() {
		return (
			<div className="Scoreboard">
				<button onClick={this.updateScore}>Hey: {this.props.score}</button>
			</div>
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
