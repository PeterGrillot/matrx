import { UPDATE_COUNT, UPDATE_SCORE, UPDATE_ROUND, RANDOMIZE_ENTRIES } from './actions';
import { DEFAULT_STATE } from '../util/models';

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case UPDATE_COUNT: {
    const newCount = action.count === 'reset' ? 0 : state.count + action.count;
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
  case UPDATE_ROUND: {
    const newRound = action.round === 'reset' ? 0 : --state.round;
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
  default: {
    return state;
  }
  }
};
