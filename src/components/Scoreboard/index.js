// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Message } from 'components/UI/Message/';

import './index.css';

type Props = {
  count: number,
  score: number,
  round: number,
  hiScore: number,
  message: string
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
      <Message
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

export default connect(mapStateToProps)(Scoreboard);
