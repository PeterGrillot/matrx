import React, { Component } from 'react';
import Matrix from './components/Matrix';
import Scoreboard from './components/Scoreboard';
import styled from 'styled-components';

// Static
import './static/styles.css';
import img from './static/graphy-dark.png'

// Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducers';

// Create Store
const matrix = {
  entries: [
    0,1,2,3,4,5,6,7,8
  ],
  vector: [
    [0,0],[0,1],[0,2],
    [1,0],[1,1],[1,2],
    [2,0],[2,1],[2,2],
  ],
  ts: 0,
  score: 0
}

let store = createStore(reducer, matrix)
const Main = styled.main`
  padding: 4em;
  background-size: 3rem;
  background: turquoise;
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
        </Main>
      </Provider>
    );
  }
}

export default App;
