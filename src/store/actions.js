export const UPDATE_SCORE = "UPDATE_SCORE";
export const RANDOMIZE_ENTRIES = "RANDOMIZE_ENTRIES";

export const updateScore = (score, bonus) => {
	return {
		type: UPDATE_SCORE,
		score,
		bonus
	};
}

export const randomizeEntries = (entries) => {
	return {
		type: RANDOMIZE_ENTRIES,
		entries
	};
}