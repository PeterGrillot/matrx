
const vector = [
  [0,0],[0,1],[0,2],
  [1,0],[1,1],[1,2],
  [2,0],[2,1],[2,2],
]

const entries = [
  0,1,2,3,4,5,6,7,8
]

const randomize = (array) => {
  
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const init = () => {
  console.log(randomize(entries));
  console.log(entries[3]);
  console.log(vector[3]);
}
init();