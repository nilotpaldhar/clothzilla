import {
	SHOW_SEARCHBAR,
	HIDE_SEARCHBAR,
	SET_SEARCH_QUERY,
	CLEAR_SEARCH_QUERY,
	SEARCH_REQUEST,
	SEARCH_SUCCESS,
	SEARCH_FAIL,
	CLEAR_SEARCH_RESULT,
} from './search.types';

const INITIAL_STATE = {
	hidden: true,
	loading: false,
	error: null,
	query: '',
	results: [],
};

const searchReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SHOW_SEARCHBAR:
			return { ...state, hidden: false };

		case HIDE_SEARCHBAR:
			return { ...state, hidden: true };

		case SET_SEARCH_QUERY:
			return { ...state, query: action.payload };

		case CLEAR_SEARCH_QUERY:
			return { ...state, query: '' };

		case SEARCH_REQUEST:
			return { ...state, loading: true };

		case SEARCH_SUCCESS:
			return { ...state, loading: false, error: null, results: action.payload };

		case SEARCH_FAIL:
			return { ...state, loading: false, error: action.payload, results: [] };

		case CLEAR_SEARCH_RESULT:
			return { ...state, loading: false, error: null, results: [] };

		default:
			return state;
	}
};

export default searchReducer;
