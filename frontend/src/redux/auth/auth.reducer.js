import Cookies from 'js-cookie';
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
} from './auth.types';

const INITIAL_STATE = {
	token: Cookies.get('token') || null,
	loading: false,
	loginError: null,
	registerError: null,
	logoutError: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
		case REGISTER_REQUEST:
		case LOGOUT_REQUEST:
			return { ...state, loading: true };

		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			Cookies.set('token', action.payload.token, { expires: 5 });
			return {
				...state,
				loading: false,
				success: true,
				token: action.payload.token,
				loginError: null,
				registerError: null,
			};

		case LOGOUT_SUCCESS:
			Cookies.remove('token');
			return { ...state, loading: false, token: null };

		case LOGIN_FAIL:
			return { ...state, loading: false, loginError: action.payload };

		case REGISTER_FAIL:
			return { ...state, loading: false, registerError: action.payload };

		case LOGOUT_FAIL:
			Cookies.remove('token');
			return { ...state, loading: false, logoutError: action.payload };

		default:
			return state;
	}
};

export default authReducer;
