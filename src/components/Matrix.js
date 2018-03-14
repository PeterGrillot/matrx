import React, { Component } from 'react';

// Needed to get Store!
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';
const mix = (array) => {
	let currentIndex = array.length,
		temporaryValue, randomIndex;

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
		this.buildMatrix = this.buildMatrix.bind(this)
		this.selectEntry = this.selectEntry.bind(this)
		this.buildMatrix();
	}

	buildMatrix(){
		this.props.randomizeEntries(mix(this.props.entries))
		console.log(this.props.entries)
	}
	selectEntry(entryNum){
		console.log(entryNum)
	}
	render() {
		return (
			<div className="Matrix">
				{this.props.entries.map((item, index)=>{
					return <button onClick="selectEntry(item)" key={index}>{item}</button>
				})}
				<button onClick={this.buildMatrix}>RANDO</button>
			</div>
		);
	}
}
function mapStateToProps(state) {
  return { entries: state.entries }
}
function mapDispachToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Matrix);