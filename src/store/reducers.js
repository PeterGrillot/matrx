import { UPDATE_SCORE, RANDOMIZE_ENTRIES } from "./actions";

const mix = (array) => {
	let currentIndex = array.length,
		temporaryValue, randomIndex;

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

export default (state = {}, action) => {
	switch (action.type) {
		case UPDATE_SCORE:
			let newScore = state.score + action.bonus;
			return {
				...state,
				'score': newScore
			}

		case RANDOMIZE_ENTRIES:


			console.log(mix(action.entries))
			return {
				...state,
				'entries': mix(action.entries)
			}

		default:
			return state;
	}
};