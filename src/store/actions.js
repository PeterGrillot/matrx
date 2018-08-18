export const UPDATE_COUNT = 'UPDATE_COUNT';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const UPDATE_ROUND = 'UPDATE_ROUND';
export const UPDATE_BONUS = 'UPDATE_BONUS';
export const RANDOMIZE_ENTRIES = 'RANDOMIZE_ENTRIES';

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

export const updateRound = (round) => {
  return {
    type: UPDATE_ROUND,
    round
  };
};

export const updateBonus = (bonus) => {
  return {
    type: UPDATE_BONUS,
    bonus
  };
};

export const randomizeEntries = (entries) => {
  return {
    type: RANDOMIZE_ENTRIES,
    entries
  };
};
