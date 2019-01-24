import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  updateCount,
  updateScore,
  updateRound,
  randomizeEntries
} from '../store/actions';

import { integer, mix } from '../util/math';
import { DEFAULT_STATE, VECTOR } from '../util/models';

const MatrixArea = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 30rem;
  margin: auto;
`;

const buttonElements = () => [...document.querySelectorAll('.button')];

class Matrix extends Component {
  state = {
    score: DEFAULT_STATE.score,
    count: DEFAULT_STATE.count,
    steps: DEFAULT_STATE.steps,
    selectedArray: []
  };

  componentDidMount = () => {
    this.props.randomizeEntries(mix(this.props.entries));
  }

  handleScore = (newScore) => {
    this.props.updateScore(newScore);
  }

  buildMatrix = () => {
    this.props.updateCount(0);
    this.props.randomizeEntries(mix(this.props.entries));
  }

  resetMatrix = () => {
    buttonElements().map((button) => {
      return button.removeAttribute('disabled');
    });
    this.props.updateRound();
    this.buildMatrix();
    this.setState({ ...DEFAULT_STATE, selectedArray: [] });
  }

  getVector = (location) => {
    return VECTOR[location];
  }

  getCurrentVector = (vectorArray) => {
    const top = `${integer(vectorArray[0]) - 1},${integer(vectorArray[1])}`;
    const bottom = `${integer(vectorArray[0]) + 1},${integer(vectorArray[1])}`;
    const left = `${integer(vectorArray[0])},${integer(vectorArray[1]) - 1}`;
    const right = `${integer(vectorArray[0])},${integer(vectorArray[1]) + 1}`;
    return [top, bottom, left, right];
  }

  resetButtons = () => {
    buttonElements().map((button) => {
      return button.setAttribute('disabled', true);
    });
  }

  gameOver = () => {
    const { score } = this.state;
    // PETE: NEEDS  MESSAGE
    // eslint-disable-next-line
    alert(`Game Over. You scored ${score}`);
    this.props.updateRound();
    this.resetMatrix();
  }

  getButtonElement = (buttonId) => {
    return document.querySelector(`button[data-vector="${buttonId}"]`);
  }

  selectEntry = (event) => {
    const { round } = this.props;
    if (round === 0) {
      this.gameOver();
      return;
    }
    const target = event.currentTarget;
    const vector = target.dataset.vector.split(',');
    // enable certain buttons
    const enableArray = this.getCurrentVector(vector);

    // handle button toggle
    this.setState({
      selectedArray: [...this.state.selectedArray, target.dataset.vector]
    }, () => {
      const enabledWithoutSelected = _.without(enableArray, ...this.state.selectedArray);
      enabledWithoutSelected.map((item) => {
        const buttonElement = this.getButtonElement(item);
        if (buttonElement) {
          return buttonElement.removeAttribute('disabled');
        }
        return false;
      });
    });

    this.resetButtons();
    target.setAttribute('disabled', true);
    this.setState({
      steps: this.state.steps + 1,
      count: this.props.updateCount(integer(target.dataset.num)),
      score: this.state.score + integer(target.dataset.num)
    }, () => {
      const { score, steps } = this.state;
      if (score === 10) {
        const newScore = integer(steps) === 5 ? 1000 : integer(steps) * 100;
        this.handleScore(newScore);
        this.resetMatrix();
      }
      if (score > 10) {
        this.resetMatrix();
      }
    });
  }

  render() {
    return (
      <MatrixArea className="Matrix">
        {this.props.entries.map((item, index) => {
          return (
            <button
              className="button"
              onClick={this.selectEntry}
              data-num={item}
              data-vector={this.getVector(index)}
              key={index}
            >
              {item}
            </button>
          );
        })}
      </MatrixArea>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    entries: state.entries,
    score: state.score,
    round: state.round
  };
};

const mapDispachToProps = (dispatch) => {
  return bindActionCreators({ updateCount, updateScore, updateRound, randomizeEntries }, dispatch);
};

export default connect(mapStateToProps, mapDispachToProps)(Matrix);
