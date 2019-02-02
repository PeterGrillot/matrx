import React, { Component } from 'react';
import { connect } from 'react-redux';

import Matrix from 'components/Matrix/index.js';
import Scoreboard from 'components/Scoreboard/index.js';
import Toolbar from 'components/Toolbar/index.js';

// Static
import './static/style.css';
import img from './static/morocco.png';

class App extends Component {
  render() {
    const { open } = this.props;
    return (
      <main
        className="App"
        style={{ backgroundImage: `url(${img})` }}
        active={open ? 'active' : null}
      >
        <header className="App-header">
          <h1 className="App-title">Matrx</h1>
        </header>
        <Matrix />
        <Scoreboard />
        <Toolbar />
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.open
  };
};

export default connect(mapStateToProps)(App);
