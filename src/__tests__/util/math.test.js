import _ from 'lodash';
import {
  interger,
  mix,
  clamp
} from 'util/math';

describe('clamp = fn(): Adds 2 value, but returns 0 if reset with -1', () => {
  test('Adds 1 + 2 to equal 3', () => {
    expect(clamp(1, 2)).toBe(3);
  });

  test('It only adds, if you send any number under 0 it returns 0', () => {
    expect(clamp(-1, 2)).toBe(0);
  });
});

describe('mix = fn(): Randomizes Array', () => {
  test('Should have all values', () => {
    const vector = [0, 1, 2];
    expect(mix(vector)).toContain(0, 1, 2);
  });

  test('Should randomize array, NOTE: If fails, play the lottery', () => {
    const sortedVector = [2, 3, 5, 6, 1, 5, 6, 8, 9, 5, 6, 8, 4, 5, 3, 6, 7, 8, 9, 9, 8, 7, 6, 6, 7, 6, 7, 7, 6, 7, 7, 7, 7, 6, 6, 7, 7, 6, 6, 5, 5, 4, 3, 3, 3, 4, 3, 4, 4, 3, 4, 3, 3, 4, 4, 5, 5].sort();
    const mixVector = mix([2, 3, 5, 6, 1, 5, 6, 8, 9, 5, 6, 8, 4, 5, 3, 6, 7, 8, 9, 9, 8, 7, 6, 6, 7, 6, 7, 7, 6, 7, 7, 7, 7, 6, 6, 7, 7, 6, 6, 5, 5, 4, 3, 3, 3, 4, 3, 4, 4, 3, 4, 3, 3, 4, 4, 5, 5]);

    expect(sortedVector).not.toEqual(mixVector);
  });
});
