import React, { Component } from 'react';
import Matrix from './components/Matrix';
import Scoreboard from './components/Scoreboard';

import './App.css';

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

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Matrx</h1>
          </header>
          <Matrix />
          <Scoreboard />
        </div>
      </Provider>
    );
  }
}

export default App;
