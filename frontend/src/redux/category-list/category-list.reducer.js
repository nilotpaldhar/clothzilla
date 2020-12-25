import {
	CATEGORY_LIST_REQUEST,
	CATEGORY_LIST_SUCCESS,
	CATEGORY_LIST_FAIL,
	SET_ACTIVE_CATEGORY,
	CREATE_CATEGORY,
	EDIT_CATEGORY,
	UPDATE_CATEGORY,
	DELETE_CATEGORY,
} from './category-list.types';

const INITIAL_STATE = {
	loading: false,
	error: null,
	categories: [],
	activeCategory: '*',
	activeCategoryTitle: 'Latest Products',
	editing: false,
	editCategory: {},
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

		case CREATE_CATEGORY:
			return { ...state, categories: [...state.categories, action.payload] };

		case EDIT_CATEGORY:
			return { ...state, editing: true, editCategory: action.payload };

		case UPDATE_CATEGORY:
			return {
				...state,
				editing: false,
				editCategory: {},
				categories: state.categories.map((category) =>
					category._id === action.payload._id
						? { ...category, name: action.payload.name }
						: category
				),
			};

		case DELETE_CATEGORY:
			return {
				...state,
				categories: state.categories.filter(
					(category) => category._id !== action.payload
				),
			};

		default: {
			return state;
		}
	}
};

export default categoryListReducer;
