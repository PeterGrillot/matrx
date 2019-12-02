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
  message: Array<string>,
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

  renderColorByTime = () => {
    if (this.props.timer < 20) {
      return 'var(--danger)';
    }
    if (this.props.timer < 40) {
      return 'var(--warning)';
    }
  }

  pauseGame = () => {
    this.props.updateMessage(`Paused: ${this.props.score}pts. ${secondsToMinutes(this.props.timer)} left`);
    this.props.stopTimer();
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
              style={{
                width: `${regressWidth}vw`,
                background: this.renderColorByTime()
              }}
            />
            <div className="Timer__cluster">
              <button
                className="button__pause"
                onClick={this.pauseGame}
              >||</button>
              <div className="Timer__numeral">
                {secondsToMinutes(this.props.timer)}
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h1>Matrx</h1>
            <Typist>{this.props.message[this.props.message.length - 1]}</Typist>
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
    score: state.score,
    message: state.message
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
