import React, { Component } from 'react';
import styled from 'styled-components';

// Needed to get Store!
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

const MatrixArea = styled.section`
	display: flex;
	flex-wrap: wrap;
	width: 30rem;
  margin: auto;
`
const Entry = styled.button`
	flex-basis: 10rem;
	height: 10rem;
`

let tempScore = 0;
let tempCount = 0;

const mix = (array) => {
	let currentIndex = array.length
	let temporaryValue
	let randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

class Matrix extends Component {
	constructor(props) {
		super(props);
		this.updateScore = this.updateScore.bind(this)
		this.buildMatrix = this.buildMatrix.bind(this)
		this.selectEntry = this.selectEntry.bind(this)
		this.buildMatrix();
	}
	updateScore(tScore){
		console.log(tScore)
		this.props.updateScore(this.props.score, tScore);
	}
	buildMatrix(){
		this.props.randomizeEntries(mix(this.props.entries));
	}
	resetMatrix(){
		tempCount = 0;
		tempScore = 0;
		this.buildMatrix();
	}
	selectEntry(event){
		tempCount = ++tempCount;
		tempScore = tempScore + parseInt(event.target.dataset.num);
		if (tempScore === 10){
			console.log(tempCount)
			this.updateScore(parseInt(tempCount) * 100);
			this.resetMatrix();
		} else if (tempScore > 10){
			this.resetMatrix();
		}
	}
	render() {
		return (
			<MatrixArea className="Matrix">
				{this.props.entries.map((item, index) => {
					return <Entry onClick={this.selectEntry} data-num={item} key={index}>{item}</Entry>
				})}
			</MatrixArea>
		);
	}
}

// buildMatrix
function mapStateToProps(state) {
  return {
  	entries: state.entries,
  	score: state.score
  }
}
function mapDispachToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Matrix);