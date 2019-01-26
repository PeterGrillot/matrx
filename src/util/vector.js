import { integer } from 'util/math';
import { VECTOR } from 'util/models';

export function getVector(location) {
  return VECTOR[location];
}

export function getCurrentVector(vectorArray) {
  const top = `${integer(vectorArray[0]) - 1},${integer(vectorArray[1])}`;
  const bottom = `${integer(vectorArray[0]) + 1},${integer(vectorArray[1])}`;
  const left = `${integer(vectorArray[0])},${integer(vectorArray[1]) - 1}`;
  const right = `${integer(vectorArray[0])},${integer(vectorArray[1]) + 1}`;
  return [top, bottom, left, right];
}
