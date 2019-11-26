// @flow
import { integer, mix } from 'util/math';
import { DEFAULT_STATE } from 'util/models';

export function getCurrentVector(vectorArray: Array<any>) {
  const top = `${integer(vectorArray[0]) - 1},${integer(vectorArray[1])}`;
  const bottom = `${integer(vectorArray[0]) + 1},${integer(vectorArray[1])}`;
  const left = `${integer(vectorArray[0])},${integer(vectorArray[1]) - 1}`;
  const right = `${integer(vectorArray[0])},${integer(vectorArray[1]) + 1}`;
  return [top, bottom, left, right];
}

export function createMatrix(columnRowSize: number) {
  const newMatrix = [];
  for (let n = 0; n < columnRowSize; n++) {
    for (let i = 0; i < columnRowSize; i++) {
      newMatrix.push([n, i]);
    }
  }
  return newMatrix;
}

export function createMatrixStore(newMatrixSize: number) {
  const newMatrix = createMatrix(newMatrixSize);
  const newEntries = newMatrix.map((i, n) => {
    return n >= 10 ? n % 10 : n;
  });
  // Create Store
  return {
    ...DEFAULT_STATE,
    entries: mix(newEntries),
    matrix: newMatrix,
    size: newMatrixSize
  };
}
