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
  constructor(props) {
    super(props);
    this.state = {
      count: props.count,
      score: props.score,
      round: props.round,
      bonus: props.bonus
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps });
  }

  render() {
    const {
      count,
      score,
      round,
      bonus
    } = this.state;

    return (
      <ScoreArea className="Scoreboard">
        <span>Count: {count}</span>
        <span>Score: {score}</span>
        <span>Round: {round}</span>
        <span>Bonus: {bonus}</span>
      </ScoreArea>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.count,
    score: state.score,
    round: state.round,
    bonus: state.bonus
  };
}

export default connect(mapStateToProps)(Scoreboard);
