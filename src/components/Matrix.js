import React, { Component } from 'react';

// Needed to get Store!
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

class Matrix extends Component {

	constructor(props) {
		super(props);
		this.buildMatrix = this.buildMatrix.bind(this)
		this.buildMatrix();
	}

	buildMatrix(){
		const { dispatch } = this.props;
		this.boundActionCreators = bindActionCreators(Actions, dispatch);
		dispatch(Actions.randomizeEntries(this.props.entries));
	}
	render() {
		return (
			<div className="Matrix">
				{this.props.entries}
				<button onClick={this.buildMatrix}>RANDO</button>
			</div>
		);
	}
}
function mapStateToProps(state) {
  return { entries: state.entries }
}
export default connect(mapStateToProps)(Matrix);
