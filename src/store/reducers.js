import {
  UPDATE_COUNT,
  UPDATE_SCORE,
  DECREMENT_ROUND,
  RANDOMIZE_ENTRIES,
  RESET_STORE
} from './actions';
import { DEFAULT_STATE } from '../util/models';

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case UPDATE_COUNT: {
    const newCount = action.count === -1 ? 0 : state.count + action.count;
    return {
      ...state,
      count: newCount
    };
  }
  case UPDATE_SCORE: {
    return {
      ...state,
      score: action.score + state.score
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
  default: {
    return state;
  }
  }
};
