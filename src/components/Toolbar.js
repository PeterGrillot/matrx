// @flow
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  updateMatrix
} from 'store/actions';

import { Select } from 'components/ui/Select';

const matrixSelectOptions = [];
for (let i = 3; i <= 8; i++) {
  matrixSelectOptions.push({ label: `[${i}x${i}]`, value: i });
}

type Props = {
  size: number,
  updateMatrix: (value: number | string) => void
}

class Toolbar extends React.Component<Props> {
  handleChange = (event: SyntheticEvent<HTMLSelectElement>) => {
    this.props.updateMatrix(event.target.value);
  }

  render() {
    return (
      <div className="Toolbar">
        <label htmlFor="selectSize">
          {`Matrix Size [${this.props.size}]:`}
        </label>
        <Select
          name="selectSize"
          handleChange={this.handleChange}
          options={matrixSelectOptions} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    size: state.size
  };
};

const mapDispachToProps = (dispatch) => {
  return bindActionCreators({ updateMatrix }, dispatch);
};

export default connect(mapStateToProps, mapDispachToProps)(Toolbar);
