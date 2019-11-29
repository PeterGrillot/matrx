// @flow
import React, { Component } from 'react';
import './Toolbar.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import {
  updateMatrix,
  toogleToolbar
} from 'store/actions';
import { createMatrixSizes } from 'util/models';
import { Select } from 'components/UI/Select/Select.ui';

const matrixSelectOptions = createMatrixSizes();

type Props = {
  size: number,
  open: boolean,
  toogleToolbar: () => void,
  updateMatrix: (value: number | string) => void
}

type State = {
  open: boolean
}

class Toolbar extends Component<Props, State> {
  toggleToolbar = () => {
    this.props.toogleToolbar();
  }

  handleChange = (event: SyntheticEvent<HTMLSelectElement>) => {
    this.props.updateMatrix(event.currentTarget.value);
  }

  handleClickOutside = () => {
    if (this.props.open) {
      this.props.toogleToolbar();
    }
  };

  render() {
    const { open } = this.props;
    return (
      <article
        className="Toolbar"
        active={open ? 'active' : null}
      >
        <button className="Toolbar__toggle" onClick={this.toggleToolbar}>{open ? '[X]' : '[?]'}</button>
        <section className="Toolbar__text">
          <h2>How To:</h2>
          <p>Select numbers to get to 10 using the MOST moves. You can only select adjacent numbers. Each step is added until 10 is reached OR you go over 10.</p>
          <h3>Scoring:</h3>
          <p>Score = steps ^2 * 100; e.g; 6 + 4 = (2^2 * 100) => 400</p>
          <p>If you go over 10 tou are epnalized 500 pts with NO time added.</p>
          <h3>Timer:</h3>
          <p>Starts at 60 second. Time is added as you score. Added time equals steps squared. e,g: (6)(4) => 2 steps ^2 => 4 seconds added!</p>
          <h3>Setting:</h3>
          <label className="Toolbar__label" htmlFor="selectSize">
            {`Matrix Size [${this.props.size}]:`}
          </label>
          <Select
            className="Toolbar__select"
            name="selectSize"
            handleChange={this.handleChange}
            options={matrixSelectOptions} />
        </section>
      </article>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    size: state.size,
    open: state.open
  };
};

const mapDispachToProps = (dispatch) => {
  return bindActionCreators({ updateMatrix, toogleToolbar }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(onClickOutside(Toolbar));
