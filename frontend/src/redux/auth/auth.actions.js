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
import authApi from '../../api/auth/auth.api';
import parseErrorMsg from '../../utils/parseErrorMsg';
import { loadUserSuccess, loadUserReset } from '../user/user.actions';

// User login actions
export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (data) => ({ type: LOGIN_SUCCESS, payload: data });
export const loginFail = (error) => ({ type: LOGIN_FAIL, payload: error });

export const loginAsync = (credentials) => (dispatch) => {
	dispatch(loginRequest());

	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await authApi.login(credentials);
			dispatch(loginSuccess(data));
			dispatch(loadUserSuccess(data.user));
			resolve(data);
		} catch (error) {
			const errorMsg = parseErrorMsg(error);
			dispatch(loginFail(errorMsg));
			reject(errorMsg);
		}
	});
};

// User register actions
export const registerRequest = () => ({ type: REGISTER_REQUEST });
export const registerSuccess = (data) => ({
	type: REGISTER_SUCCESS,
	payload: data,
});
export const registerFail = (error) => ({
	type: REGISTER_FAIL,
	payload: error,
});

export const registerAsync = (userData) => (dispatch) => {
	dispatch(registerRequest());

	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await authApi.register(userData);
			dispatch(registerSuccess(data));
			dispatch(loadUserSuccess(data.user));
			resolve(data);
		} catch (error) {
			const errorMsg = parseErrorMsg(error);
			dispatch(registerFail(errorMsg));
			reject(errorMsg);
		}
	});
};

// User logout actions
export const logoutRequest = () => ({ type: LOGOUT_REQUEST });
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });
export const logoutFail = (error) => ({ type: LOGOUT_FAIL, payload: error });

export const logoutAsync = () => (dispatch, getState) => {
	dispatch(logoutRequest());

	return new Promise(async (resolve, reject) => {
		try {
			const { auth } = getState();
			await authApi.logout(auth.token);
			dispatch(logoutSuccess());
			dispatch(loadUserReset());
			resolve();
		} catch (error) {
			const errorMsg = parseErrorMsg(error);
			dispatch(logoutFail());
			reject(errorMsg);
		}
	});
};
