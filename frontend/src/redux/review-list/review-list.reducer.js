import {
	REVIEW_LIST_REQUEST,
	REVIEW_LIST_SUCCESS,
	REVIEW_LIST_FAIL,
	CREATE_REVIEW_SUCCESS,
} from './review-list.types';

const INITIAL_STATE = {
	loading: false,
	error: null,
	reviews: [],
};

const reviewListReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case REVIEW_LIST_REQUEST:
			return { ...state, loading: true };

		case REVIEW_LIST_SUCCESS:
			return { ...state, loading: false, reviews: action.payload, error: null };

		case REVIEW_LIST_FAIL:
			return { ...state, loading: false, error: action.payload };

		case CREATE_REVIEW_SUCCESS:
			return { ...state, reviews: [{ ...action.payload }, ...state.reviews] };

		default:
			return state;
	}
};

export default reviewListReducer;
