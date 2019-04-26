// **************************//
// Count: count * steps, aggragated
// Step: Points in each round
// Steps: Number of moves
// buttons to enable
// **************************//
export const MATRIX_SETTINGS = {
  min: 6,
  max: 12
};

export const DEFAULT_STATE = {
  score: 0,
  roundScore: 0,
  count: 0,
  steps: 0,
  round: 3,
  size: MATRIX_SETTINGS.min,
  message: '',
  open: false,
  hiScore: localStorage.getItem('hiScore') || 0
};

export function createMatrixSizes() {
  const matrixSelectOptions = [];
  for (let i = MATRIX_SETTINGS.min; i <= MATRIX_SETTINGS.max; i++) {
    matrixSelectOptions.push({ label: `[${i}x${i}]`, value: i });
  }
  return matrixSelectOptions;
}
