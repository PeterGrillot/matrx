import {
  createMatrix
} from 'util/vector';

describe('createVector: fn() => Creates a vector with size provided', () => {
  test('Adds 1 + 2 to equal 3', () => {
    const staticVector = [
      [0, 0], [0, 1], [0, 2],
      [1, 0], [1, 1], [1, 2],
      [2, 0], [2, 1], [2, 2]
    ];
    const newMatrixSize = 3;
    const matrix = createMatrix(newMatrixSize);
    expect(matrix[0]).toEqual([0, 0]);
    expect(matrix[8]).toEqual([2, 2]);
    expect(matrix.length).toEqual(staticVector.length);
  });
});
