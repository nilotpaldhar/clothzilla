import {
	GET_USER_PROFILE_REQUEST,
	GET_USER_PROFILE_SUCCESS,
	GET_USER_PROFILE_FAIL,
	UPDATE_USER_PROFILE_REQUEST,
	UPDATE_USER_PROFILE_SUCCESS,
	UPDATE_USER_PROFILE_FAIL,
} from './user-profile.types';

const INITIAL_STATE = {
	loading: false,
	updating: false,
	error: null,
	updateError: null,
	details: {},
};

const profileReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_USER_PROFILE_REQUEST:
			return { ...state, loading: true };

		case UPDATE_USER_PROFILE_REQUEST:
			return { ...state, updating: true };

		case GET_USER_PROFILE_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				details: action.payload,
			};

		case UPDATE_USER_PROFILE_SUCCESS:
			return {
				...state,
				updating: false,
				updateError: null,
				details: action.payload,
			};

		case GET_USER_PROFILE_FAIL:
			return {
				...state,
				loading: false,
				updating: false,
				error: action.payload,
			};

		case UPDATE_USER_PROFILE_FAIL:
			return {
				...state,
				updating: false,
				updateError: action.payload,
			};

		default:
			return state;
	}
};

export default profileReducer;
