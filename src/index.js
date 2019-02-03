import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducer from './store/reducers';
import { createMatrixStore } from './util/vector';

// Logger with default options
import logger from 'redux-logger';
const newMatrixSize = 5;
const newMatrixStore = createMatrixStore(newMatrixSize);

const store = createStore(reducer, newMatrixStore, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);
registerServiceWorker();
