import React, { Component } from 'react';
import Matrix from 'components/Matrix';
import Scoreboard from 'components/Scoreboard';
import Toolbar from 'components/Toolbar';
import styled from 'styled-components';

// Static
import './static/styles/main.css';
import img from './static/morocco.png';

// Redux
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducer from './store/reducers';
import { createMatrixStore } from './util/vector';
// Logger with default options
import logger from 'redux-logger';
const newMatrixSize = 3;
const newMatrixStore = createMatrixStore(newMatrixSize);

const store = createStore(reducer, newMatrixStore, applyMiddleware(logger));
const Main = styled.main`
  background-size: 10vw;
  background-image: url(${img});
`;
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main className="App">
          <header className="App-header">
            <h1 className="App-title">Matrx</h1>
          </header>
          <Matrix />
          <Scoreboard />
          <Toolbar />
        </Main>
      </Provider>
    );
  }
}

export default App;
