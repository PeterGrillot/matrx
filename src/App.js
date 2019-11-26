// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Matrix from 'components/Matrix/Matrix.component.js';
import Scoreboard from 'components/Scoreboard/Scoreboard.component.js';
import Toolbar from 'components/Toolbar/Toolbar.component.js';

// Static
import './static/style.css';
// import 'normalize.css';

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
