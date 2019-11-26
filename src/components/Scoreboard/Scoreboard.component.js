// @flow
import * as React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import {
  updateScore,
  incrementRound,
  updateMessage,
  setHiScore
} from 'store/actions';

import { Console } from 'components/UI/Console/Console.ui';

import './Scoreboard.css';

type Props = {
  count: number,
  score: number,
  round: number,
  hiScore: number,
  message: Array<string>,
  updateScore: (score: number) => void,
  incrementRound: (toggle: boolean) => void,
  updateMessage: (message: string) => void,
  setHiScore: (score: number) => void
}

const Scoreboard = (props: Props) => {
  const {
    count,
    score,
    round,
    message,
    hiScore
  } = props;

  const gameOver = () => {
    props.updateMessage(`Game Over. You scored ${score}!`);
    props.updateScore(-1);
    props.incrementRound(false);
    props.setHiScore(score);
  };

  return (
    <React.Fragment>
      <div className="Scoreboard">
        <span className="Scoreboard__tile">Count: {count}</span>
        <span className="Scoreboard__tile">Score: {score}</span>
        <span className="Scoreboard__tile">Round: {round}</span>
        <span className="Scoreboard__tile">Hi-Score: {hiScore}</span>
        <button onClick={gameOver}>im done</button>
      </div>
      <Console
        expanded={!_.isEmpty(message)}
        message={message}
      />
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    count: state.count,
    score: state.score,
    hiScore: state.hiScore,
    round: state.round,
    message: state.message
  };
}
const mapDispachToProps = (dispatch) => {
  return bindActionCreators({
    updateScore,
    incrementRound,
    updateMessage,
    setHiScore
  }, dispatch);
};
export default connect(mapStateToProps, mapDispachToProps)(Scoreboard);
