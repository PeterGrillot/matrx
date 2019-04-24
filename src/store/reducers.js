import {
  UPDATE_COUNT,
  UPDATE_SCORE,
  TOGGLE_TOOLBAR,
  DECREMENT_ROUND,
  RANDOMIZE_ENTRIES,
  RESET_STORE,
  UPDATE_MATRIX,
  UPDATE_MESSAGE,
  SET_HISCORE
} from './actions';

import { DEFAULT_STATE } from 'util/models';
import { clamp } from 'util/math';
import { createMatrixStore } from 'util/vector';

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case UPDATE_COUNT: {
    return {
      ...state,
      count: clamp(action.count, state.count)
    };
  }
  case UPDATE_SCORE: {
    return {
      ...state,
      score: clamp(action.score, state.score)
    };
  }
  case DECREMENT_ROUND: {
    const newRound = !action.round ? DEFAULT_STATE.round : --state.round;
    return {
      ...state,
      round: newRound
    };
  }
  case RANDOMIZE_ENTRIES: {
    const randomArray = [...state.entries];
    return Object.assign({}, state, {
      entries: randomArray
    });
  }
  case RESET_STORE: {
    return DEFAULT_STATE;
  }
  case UPDATE_MESSAGE: {
    return {
      ...state,
      message: action.message
    };
  }
  case UPDATE_MATRIX: {
    const newStore = createMatrixStore(action.newSize);
    return {
      ...DEFAULT_STATE,
      ...newStore
    };
  }
  case TOGGLE_TOOLBAR: {
    return {
      ...state,
      open: !state.open
    };
  }
  case SET_HISCORE: {
    const currentHiScore = localStorage.getItem('hiScore');
    if (action.hiScore > currentHiScore) {
      localStorage.setItem('hiScore', action.hiScore);
      return {
        ...state,
        hiScore: action.hiScore
      };
    }
    return state;
  }
  default: {
    return state;
  }
  }
};
