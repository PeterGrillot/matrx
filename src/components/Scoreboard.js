import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const ScoreArea = styled.section`
  display: flex;
  padding: 1rem;
  background: rgba(255,255,255,0.3);
  width: 30rem;
  margin: auto;
`;

class Scoreboard extends React.Component {
  state = {
    count: this.props.count,
    score: this.props.score,
    round: this.props.round
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps });
  }

  render() {
    const {
      count,
      score,
      round
    } = this.state;

    return (
      <ScoreArea className="Scoreboard">
        <span>Count: {count}</span>
        <span>Score: {score}</span>
        <span>Round: {round}</span>
      </ScoreArea>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.count,
    score: state.score,
    round: state.round
  };
}

export default connect(mapStateToProps)(Scoreboard);
