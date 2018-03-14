import { UPDATE_SCORE, RANDOMIZE_ENTRIES } from "./actions";

export default (state = {}, action) => {
	switch (action.type) {
		case UPDATE_SCORE:
			let newScore = state.score + action.bonus;
			return {
				...state,
				score: newScore
			}
		case RANDOMIZE_ENTRIES:
			let randomArray = [...state.entries]
			return Object.assign({}, state, {
				entries: randomArray
			})
		default:
			return state;
	}
};