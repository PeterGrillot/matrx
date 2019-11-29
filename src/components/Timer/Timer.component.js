// @flow
import React, { Component } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Typist from 'components/UI/Typist/Typist.ui';
import { TimerContext, withTimer, DEFAULT_TIMER_STATE } from './Timer.context';

import {
  updateScore,
  incrementRound,
  updateMessage,
  setHiScore
} from 'store/actions';

import { secondsToMinutes } from 'util/math';
import './Timer.css';

type Props =
& TimerContext
& {
  score: number,
  updateScore: (score: number) => void,
  incrementRound: (toggle: boolean) => void,
  updateMessage: (message: string) => void,
  setHiScore: (score: number) => void
}

class Timer extends Component<Props> {
  componentDidUpdate() {
    if (this.props.timer === 0) {
      this.props.resetTimer();
      this.gameOver();
    }
  }

  gameOver = () => {
    this.props.updateMessage(`Game Over. You scored ${this.props.score}!`);
    this.props.updateScore(-1);
    this.props.incrementRound(false);
    this.props.setHiScore(this.props.score);
  };

  render() {
    const regressWidth = (this.props.timer / DEFAULT_TIMER_STATE.timer * 100);
    return (
      <div className="Timer" data-active={this.props.isEngaged}>
        {this.props.isEngaged ? (
          <React.Fragment>
            <div
              className="Timer__regress-bar"
              style={{ width: `${regressWidth}vw` }}
            />
            <div className="Timer__cluster">
              <div className="Timer__numeral">
                {secondsToMinutes(this.props.timer)}
              </div>
              <button
                className="button__pause"
                onClick={this.props.stopTimer}
              >&#9646;&#9646;</button>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h1>Matrx</h1>
            <Typist>Press Play to begin</Typist>
            <button
              className="button__play"
              onClick={this.props.startTimer}
            >></button>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    score: state.score
  };
};
const mapDispachToProps = (dispatch) => {
  return bindActionCreators({
    updateScore,
    incrementRound,
    updateMessage,
    setHiScore
  }, dispatch);
};

export default compose(
  withTimer,
  connect(mapStateToProps, mapDispachToProps)
)(Timer);
