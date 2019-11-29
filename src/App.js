// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TimerProvider } from './components/Timer/Timer.context';

import Matrix from 'components/Matrix/Matrix.component.js';
import Timer from 'components/Timer/Timer.component.js';
import Scoreboard from 'components/Scoreboard/Scoreboard.component.js';
import Toolbar from 'components/Toolbar/Toolbar.component.js';

// Static
import './static/style.css';

type Props = {
  open: boolean
}

class App extends Component<Props> {
  render() {
    const { open } = this.props;
    return (
      <TimerProvider>
        <main
          className="App"
          active={open ? 'active' : null}
        >
          <header className="App__header">
            <h1 className="App__title">Matrx</h1>
          </header>
          <Matrix />
          <Scoreboard />
          <Toolbar />
          <Timer/>
        </main>
        <div className="GradientBackground" />
      </TimerProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.open
  };
};

export default connect(mapStateToProps)(App);
