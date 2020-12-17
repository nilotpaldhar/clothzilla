import {
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	LOAD_USER_RESET,
} from './user.types';
import authApi from '../../api/auth/auth.api';

// Load currently logged in user actions
export const loadUserRequest = () => ({ type: LOAD_USER_REQUEST });
export const loadUserSuccess = (data) => ({
	type: LOAD_USER_SUCCESS,
	payload: data,
});
export const loadUserFail = (error) => ({
	type: LOAD_USER_FAIL,
	payload: error,
});

export const loadUserAsync = () => (dispatch, getState) => {
	dispatch(loadUserRequest());
	return new Promise(async (resolve, reject) => {
		try {
			const { auth } = getState();
			const { data } = await authApi.me(auth.token);
			dispatch(loadUserSuccess(data));
			resolve(data);
		} catch (error) {
			const errorMsg =
				error.response && error.response.data.message
					? error.response.data.message
					: error.response;
			dispatch(loadUserFail(errorMsg));
			reject(error);
		}
	});
};

// Reset user details and authentication data
export const loadUserReset = () => ({ type: LOAD_USER_RESET });
