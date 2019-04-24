// @flow
import * as React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import { Message } from 'components/UI/Message/';

import './index.css';

type Props = {
  count: number,
  score: number,
  round: number,
  hiScore: number,
  message: string
}

class Scoreboard extends React.Component<Props, State> {
  state = {
    open: true
  }

  render() {
    const {
      count,
      score,
      round,
      message,
      hiScore
    } = this.props;

    return (
      <div className="Scoreboard">
        <div>Count: {count}</div>
        <div>Score: {score}</div>
        <div>Round: {round}</div>
        {!_.isEmpty(message) ? <Message
          message={message}
        /> : null}
        <div>Hi-Score: {hiScore}</div>
      </div>
    );
  }
}

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
