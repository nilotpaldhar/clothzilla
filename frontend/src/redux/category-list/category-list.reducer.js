import {
	CATEGORY_LIST_REQUEST,
	CATEGORY_LIST_SUCCESS,
	CATEGORY_LIST_FAIL,
	SET_ACTIVE_CATEGORY,
} from './category-list.types';

const INITIAL_STATE = {
	loading: false,
	error: null,
	categories: [],
	activeCategory: '*',
	activeCategoryTitle: 'Latest Products',
};

const categoryListReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CATEGORY_LIST_REQUEST:
			return { ...state, loading: true };

		case CATEGORY_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				categories: action.payload,
				error: null,
			};

		case CATEGORY_LIST_FAIL:
			return { ...state, loading: false, error: action.payload };

		case SET_ACTIVE_CATEGORY:
			return {
				...state,
				activeCategory: action.payload.id,
				activeCategoryTitle: action.payload.title,
			};

		default: {
			return state;
		}
	}
};

export default categoryListReducer;
