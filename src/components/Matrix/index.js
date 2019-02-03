// @flow
import React, { Component } from 'react';
import './index.css';
import _ from 'lodash';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  updateCount,
  updateScore,
  decrementRound,
  randomizeEntries,
  updateMessage
} from 'store/actions';

import { integer, mix } from 'util/math';
import { getCurrentVector } from 'util/vector';
import { DEFAULT_STATE } from 'util/models';

import { Button } from 'components/UI/Button/index';

const buttonElements = () => [...document.querySelectorAll('.button')];

class Matrix extends Component {
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

  componentDidMount = () => {
    this.props.randomizeEntries(mix(this.props.entries));
  };

  handleScore = (newScore) => {
    this.props.updateScore(newScore);
  };

  buildMatrix = () => {
    this.props.updateCount(-1);
    this.props.randomizeEntries(mix(this.props.entries));
  };

  async decrementRound(toggle) {
    await this.props.decrementRound(toggle);
  }

  getVector(location: number) {
    return this.props.matrix[location];
  }

  resetMatrix = () => {
    buttonElements().map((button) => {
      return button.removeAttribute('disabled');
    });
    this.decrementRound(true).then(() => {
      this.buildMatrix();
      this.setState({ ...DEFAULT_STATE, selectedArray: [] });
      if (this.props.round === 0) {
        this.gameOver();
        return false;
      }
    });
  };

  resetButtons = () => {
    buttonElements().map((button) => {
      return button.setAttribute('disabled', true);
    });
  };

  gameOver = () => {
    const { score } = this.props;
    // PETE: NEEDS  MESSAGE
    this.props.updateMessage(`Game Over. You scored ${score}`);
    this.props.updateScore(-1);
    this.props.decrementRound(false);
  };

  getButtonElement = (buttonId) => {
    return document.querySelector(`button[data-vector="${buttonId}"]`);
  };

  selectEntry = (event) => {
    const target = event.currentTarget;
    const vector = target.dataset.vector.split(',');
    // enable certain buttons
    const enableArray = getCurrentVector(vector);

    // handle button toggle
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
    target.setAttribute('disabled', true);
    this.setState({
      steps: this.state.steps + 1,
      count: this.props.updateCount(integer(target.dataset.num)),
      roundScore: this.state.roundScore + integer(target.dataset.num)
    }, () => {
      const { roundScore, steps } = this.state;
      if (roundScore === 10) {
        const newScore = integer(steps) >= 5 ? integer(steps) * 1000 : integer(steps) * 100;
        this.handleScore(newScore);
        this.resetMatrix();
      }
      if (roundScore > 10) {
        this.resetMatrix();
      }
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
    round: state.round
  };
};

const mapDispachToProps = (dispatch) => {
  return bindActionCreators({
    updateCount,
    updateScore,
    decrementRound,
    randomizeEntries,
    updateMessage
  }, dispatch);
};

export default connect(mapStateToProps, mapDispachToProps)(Matrix);
