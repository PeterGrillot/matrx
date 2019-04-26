import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducer from './store/reducers';
import { createMatrixStore } from './util/vector';
import { MATRIX_SETTINGS } from './util/models';

// Logger with default options
import logger from 'redux-logger';
const newMatrixSize = MATRIX_SETTINGS.min;
const newMatrixStore = createMatrixStore(newMatrixSize);

const store = createStore(reducer, newMatrixStore, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);
registerServiceWorker();
