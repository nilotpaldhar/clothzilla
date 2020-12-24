import {
	COUNTRY_LIST_REQUEST,
	COUNTRY_LIST_SUCCESS,
	COUNTRY_LIST_FAIL,
} from './country-list.types';

const INITIAL_STATE = {
	loading: false,
	error: null,
	countries: [],
};

const countryListReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case COUNTRY_LIST_REQUEST:
			return { ...state, loading: true };

		case COUNTRY_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				countries: action.payload,
			};

		case COUNTRY_LIST_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default countryListReducer;
