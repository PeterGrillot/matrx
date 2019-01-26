export const integer = (num) => parseInt(num, 10);

export const mix = (array) => {
  let currentIndex = array.length;
  let temporaryValue = 0;
  let randomIndex = 0;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export const clamp = (x, y) => {
  return x === -1 ? 0 : y + x;
};