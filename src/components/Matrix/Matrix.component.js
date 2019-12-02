// @flow
import React, { Component } from 'react';
import { compose } from 'redux';
import _ from 'lodash';

import './Matrix.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { TimerContext, withTimer } from 'components/Timer/Timer.context';

import {
  updateCount,
  updateScore,
  incrementRound,
  setEntries,
  updateMessage,
  setHiScore
} from 'store/actions';

import { integer, weightedRandom } from 'util/math';
import { getCurrentVector } from 'util/vector';
import { DEFAULT_STATE } from 'util/models';

import { Button } from 'components/UI/Button/Button.ui';

const MARKED_CHAR = '!';
const PENALTY_SCORE = -500;
const buttonElements = () => [...document.querySelectorAll('.button')];

type Props =
& TimerContext
& {
  entries: Array<number>,
  matrix: Array<number>,
  size: number,
  score: number,
  hiScore: number,
  round: number,
  updateCount: (count: number) => void,
  updateScore: (score: number) => void,
  incrementRound: (toggle: boolean) => void,
  setEntries: (entries: Array<number>) => void,
  updateMessage: (message: string) => void,
  setHiScore: (score: number) => void
}

type State = {
  roundScore: number,
  count: number,
  steps: number,
  selectedArray: Array<string>
}

class Matrix extends Component<Props, State> {
  state = {
    // count * steps, aggragated
    roundScore: DEFAULT_STATE.score,
    // Points in each round
    count: DEFAULT_STATE.count,
    // Number of moves
    steps: DEFAULT_STATE.steps,
    // buttons to enable
    selectedArray: []
  };

  handleScore = (newScore) => {
    this.props.updateScore(newScore);
  };

  async incrementRound(toggle) {
    await this.props.incrementRound(toggle);
  }

  async setSelected(vector: Array<number>) {
    const { entries } = this.props;
    const size = Math.sqrt(this.props.entries.length);
    const nVector = vector.map((i) => parseInt(i, 10));
    const location = (nVector[0] * size) + nVector[1];
    const newArray = _.map(entries, (i, x) => x === location ? MARKED_CHAR : i);
    this.props.setEntries(newArray);
    return true;
  }

  getVector = (location: number) => this.props.matrix[location]

  resetMatrix = () => {
    buttonElements().map((button) => {
      button.removeAttribute('disabled');
      button.removeAttribute('inactive');
    });
    this.incrementRound(true).then(() => {
      this.props.updateCount(-1);
      this.setState({ ...DEFAULT_STATE, selectedArray: [] });
    });
  };

  resetButtons = () => {
    buttonElements().map((button) => {
      button.setAttribute('disabled', 'true');
    });
  };

  convertSelected = () => {
    const { entries } = this.props;
    const convertedArray = _.map(entries, (i) => i === MARKED_CHAR ? weightedRandom() : i);
    this.props.setEntries(convertedArray);
  };

  getButtonElement = (buttonId) => {
    return document.querySelector(`button[data-vector="${buttonId}"]`);
  };

  message = (messageString: string) => this.props.updateMessage(messageString);

  selectEntry = (event) => {
    const target = event.currentTarget;
    const vector = target.dataset.vector.split(',');
    const enableArray = getCurrentVector(vector);

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
    target.setAttribute('inactive', true);

    this.setState({
      steps: this.state.steps + 1,
      count: this.props.updateCount(integer(target.dataset.num)),
      roundScore: this.state.roundScore + integer(target.dataset.num)
    }, () => {
      this.setSelected(vector).then(() => {
        const { roundScore, steps } = this.state;
        if (roundScore >= 10) {
          this.convertSelected();
          this.resetMatrix();
          if (roundScore > 10) {
            this.handleScore(PENALTY_SCORE);
            this.message(`[ouch] ${PENALTY_SCORE}!`);
            return;
          }
          const newScore = (integer(steps) * integer(steps)) * 100;
          this.props.addTimer(integer(steps) * 2);
          this.handleScore(newScore);
          this.message(`[nice] ${newScore}!`);
        }
      });
    });
  };

  render() {
    return (
      <div className="Matrix">
        {this.props.entries.map((item, index) => {
          return (
            <Button
              className="button"
              handleClick={this.selectEntry}
              number={item}
              width={this.props.size}
              vector={this.getVector(index)}
              key={index}
              label={item}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    entries: state.entries,
    matrix: state.matrix,
    size: state.size,
    score: state.score,
    hiScore: state.hiScore,
    round: state.round
  };
};

const mapDispachToProps = (dispatch) => {
  return bindActionCreators({
    updateCount,
    updateScore,
    incrementRound,
    setEntries,
    updateMessage,
    setHiScore
  }, dispatch);
};

export default compose(
  withTimer,
  connect(mapStateToProps, mapDispachToProps)
)(Matrix);
