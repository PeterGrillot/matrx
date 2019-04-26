// **************************//
// Count: count * steps, aggragated
// Step: Points in each round
// Steps: Number of moves
// buttons to enable
// **************************//
export const DEFAULT_STATE = {
  score: 0,
  roundScore: 0,
  count: 0,
  steps: 0,
  round: 3,
  message: '',
  open: false,
  hiScore: localStorage.getItem('hiScore') || 0
};
