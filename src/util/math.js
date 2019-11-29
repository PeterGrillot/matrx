// @flow

export const integer = (num: number) : number => parseInt(num, 10);

export const mix = (array: Array<number>) : Array<number> => {
  let currentIndex = array.length;
  let temporaryValue = 0;
  let randomIndex = 0;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = ~~(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export const clamp = (x: number, y: number): number => {
  return x === -1 ? 0 : y + x;
};

export const weightedRandom = () => {
  const weightedArray = [0, 0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 6, 7, 8, 9];
  const randNum = weightedArray[Math.round(Math.random() * (weightedArray.length - 1))];
  return randNum;
};

export const secondsToMinutes = (seconds: number) => {
  return `${~~(seconds / 60) }:${ (`0${ ~~(seconds % 60)}`).slice(-2)}`;
};
