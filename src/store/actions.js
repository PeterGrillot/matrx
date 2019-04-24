export const UPDATE_COUNT = 'UPDATE_COUNT';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const TOGGLE_TOOLBAR = 'TOGGLE_TOOLBAR';
export const DECREMENT_ROUND = 'DECREMENT_ROUND';
export const RANDOMIZE_ENTRIES = 'RANDOMIZE_ENTRIES';
export const RESET_STORE = 'RESET_STORE';
export const UPDATE_MATRIX = 'UPDATE_MATRIX';
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
export const SET_HISCORE = 'SET_HISCORE';

export const updateCount = (count) => {
  return {
    type: UPDATE_COUNT,
    count
  };
};

export const updateScore = (score) => {
  return {
    type: UPDATE_SCORE,
    score
  };
};

export const toogleToolbar = () => {
  return {
    type: TOGGLE_TOOLBAR
  };
};

export const decrementRound = (round) => {
  return {
    type: DECREMENT_ROUND,
    round
  };
};

export const randomizeEntries = (entries) => {
  return {
    type: RANDOMIZE_ENTRIES,
    entries
  };
};

export const resetStore = () => {
  return { type: RESET_STORE };
};

export const updateMatrix = (newSize) => {
  return {
    type: UPDATE_MATRIX,
    newSize
  };
};

export const updateMessage = (message) => {
  return {
    type: UPDATE_MESSAGE,
    message
  };
};

export const setHiScore = (hiScore) => {
  return {
    type: SET_HISCORE,
    hiScore
  };
};

