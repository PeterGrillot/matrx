// @flow
import * as React from 'react';
import './index.css';
import { connect } from 'react-redux';

type Props = {
  count: number,
  score: number,
  round: number,
  message: string
}

class Scoreboard extends React.Component<Props, State> {
  render() {
    const {
      count,
      score,
      round,
      message
    } = this.props;

    return (
      <div className="Scoreboard">
        <div>Count: {count}</div>
        <div>Score: {score}</div>
        <div>Round: {round}</div>
        <div>{message}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.count,
    score: state.score,
    round: state.round,
    message: state.message
  };
}

export default connect(mapStateToProps)(Scoreboard);
