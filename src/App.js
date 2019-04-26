// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Matrix from 'components/Matrix/index.js';
import Scoreboard from 'components/Scoreboard/index.js';
import Toolbar from 'components/Toolbar/index.js';
import Background from 'components/Background/index.js';

// Static
import './static/style.css';

type Props = {
  open: boolean
}

class App extends Component<Props> {
  render() {
    const { open } = this.props;
    return (
      <React.Fragment>
        <main
          className="App"
          active={open ? 'active' : null}
        >
          <header className="App-header">
            <h1 className="App-title">Matrx</h1>
          </header>
          <Matrix />
          <Scoreboard />
          <Toolbar />
        </main>
        <Background/>
        <div className="GradientBackground" />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.open
  };
};

export default connect(mapStateToProps)(App);
