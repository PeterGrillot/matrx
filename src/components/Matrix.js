import React, { Component } from 'react';
import styled from 'styled-components';

// Needed to get Store!
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateScore, randomizeEntries } from '../store/actions';

const MatrixArea = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 30rem;
  margin: auto;
`;
const EntryButton = styled.button`
  flex-basis: 10rem;
  height: 10rem;
`;

let tempScore = 0;
let tempCount = 0;

const mix = (array) => {
  let currentIndex = array.length;
  let temporaryValue = 0;
  let randomIndex = 0;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

class Matrix extends Component {
  constructor(props) {
    super(props);
    this.handleScore = this.handleScore.bind(this);
    this.buildMatrix = this.buildMatrix.bind(this);
    this.selectEntry = this.selectEntry.bind(this);
    this.buildMatrix();
  }

  handleScore(newScore) {
    this.props.updateScore(newScore);
  }

  buildMatrix() {
    this.props.randomizeEntries(mix(this.props.entries));
  }

  resetMatrix() {
    [...document.querySelectorAll('.button')].map((button) => {
      return button.removeAttribute('disabled');
    });
    tempCount = 0;
    tempScore = 0;
    this.buildMatrix();
  }

  selectEntry(event) {
    event.currentTarget.setAttribute('disabled', true);
    tempCount = ++tempCount;
    tempScore = tempScore + parseInt(event.target.dataset.num, 10);
    if (tempScore === 10) {
      this.handleScore(parseInt(tempCount, 10) * 100);
      this.resetMatrix();
    } else if (tempScore > 10) {
      this.resetMatrix();
    }
  }
  render() {
    return (
      <MatrixArea className="Matrix">
        {this.props.entries.map((item, index) => {
          return <EntryButton className="button" onClick={this.selectEntry} data-num={item} key={index}>{item}</EntryButton>;
        })}
      </MatrixArea>
    );
  }
}

// buildMatrix 
const mapStateToProps = (state) => {
  return {
    entries: state.entries,
    score: state.score
  };
};

const mapDispachToProps = (dispatch) => {
  return bindActionCreators({ updateScore, randomizeEntries }, dispatch);
};

export default connect(mapStateToProps, mapDispachToProps)(Matrix);
