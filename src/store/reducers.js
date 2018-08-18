import { UPDATE_COUNT, UPDATE_SCORE, UPDATE_ROUND, UPDATE_BONUS, RANDOMIZE_ENTRIES } from './actions';

export const DEFAULT_STATE = {
  count: 0,
  score: 0,
  round: 0,
  bonus: 0
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case UPDATE_COUNT: {
    return {
      ...state,
      count: ++action.count
    };
  }
  case UPDATE_SCORE: {
    return {
      ...state,
      score: action.score + state.score
    };
  }
  case UPDATE_ROUND: {
    return {
      ...state,
      round: ++action.round
    };
  }
  case UPDATE_BONUS: {
    return {
      ...state,
      bonus: action.bonus
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
