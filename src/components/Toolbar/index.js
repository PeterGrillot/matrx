// @flow
import * as React from 'react';
import './index.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import {
  updateMatrix,
  toogleToolbar
} from 'store/actions';

import { Select } from 'components/UI/Select/index';

const matrixSelectOptions = [];
for (let i = 5; i <= 10; i++) {
  matrixSelectOptions.push({ label: `[${i}x${i}]`, value: i });
}

type Props = {
  size: number,
  open: boolean,
  toogleToolbar: () => void,
  updateMatrix: (value: number | string) => void
}

type State = {
  open: boolean
}

class Toolbar extends React.Component<Props, State> {
  toggleToolbar = () => {
    this.props.toogleToolbar();
  }

  handleChange = (event: SyntheticEvent<HTMLSelectElement>) => {
    this.props.updateMatrix(event.target.value);
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
        <button className="Toolbar__toggle" onClick={this.toggleToolbar}>{ open ? '[X]' : '[?]'}</button>
        <section className="Toolbar__text">
          <h2>How To:</h2>
          <p>Select numbers to get to 10 using the MOST moves. You can only select adjacent numbers. 100 pts per move until 5 then 1000 after. Three rounds per game.</p>
          <h3>Change Size:</h3>
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

export default connect(mapStateToProps, mapDispachToProps)(onClickOutside(Toolbar));
