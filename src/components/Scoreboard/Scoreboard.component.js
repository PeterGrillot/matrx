// @flow
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import { Console } from 'components/UI/Console/Console.ui';

import './Scoreboard.css';

type Props = {
  count: number,
  score: number,
  round: number,
  hiScore: number,
  message: Array<string>,
}

const Scoreboard = (props: Props) => {
  const {
    count,
    score,
    round,
    message,
    hiScore
  } = props;

  return (
    <React.Fragment>
      <div className="Scoreboard">
        <span className="Scoreboard__tile">Count: {count}</span>
        <span className="Scoreboard__tile">Score: {score}</span>
        <span className="Scoreboard__tile">Round: {round}</span>
        <span className="Scoreboard__tile">Hi-Score: {hiScore}</span>
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

export default connect(mapStateToProps, null)(Scoreboard);
