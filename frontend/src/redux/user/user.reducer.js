import {
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	LOAD_USER_RESET,
} from './user.types';

const INITIAL_STATE = {
	isAuthenticated: false,
	isAdmin: false,
	details: null,
	loading: false,
	error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOAD_USER_REQUEST:
			return { ...state, loading: true };

		case LOAD_USER_SUCCESS:
			return {
				...state,
				loading: false,
				details: action.payload,
				isAuthenticated: true,
				isAdmin: action.payload.isAdmin,
				error: null,
			};

		case LOAD_USER_FAIL:
			return { ...state, loading: false, error: action.payload };

		case LOAD_USER_RESET:
			return {
				...state,
				isAuthenticated: false,
				isAdmin: false,
				details: null,
				error: null,
			};
		default:
			return state;
	}
};

export default userReducer;
