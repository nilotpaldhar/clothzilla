import {
	ADMIN_USER_LIST_REQUEST,
	ADMIN_USER_LIST_SUCCESS,
	ADMIN_USER_LIST_FAIL,
	ADMIN_USER_ACTIVATE,
	ADMIN_USER_DEACTIVATE,
	ADMIN_USER_MAKE_ADMIN,
	ADMIN_USER_MAKE_SUBSCRIBER,
} from './admin-user-list.types';
import adminUserApi from '../../api/admin-user/admin-user.api';
import { createNotification } from '../notification/notification.actions';
import parseErrorMsg from '../../utils/parseErrorMsg';

// Fetch all users for admin
export const adminUserListRequest = () => ({ type: ADMIN_USER_LIST_REQUEST });
export const adminUserListSuccess = (data) => ({
	type: ADMIN_USER_LIST_SUCCESS,
	payload: data,
});
export const adminUserListFail = (error) => ({
	type: ADMIN_USER_LIST_FAIL,
	payload: error,
});
export const fetchAdminUsers = () => async (dispatch, getState) => {
	dispatch(adminUserListRequest());
	try {
		const { auth } = getState();
		const { data } = await adminUserApi.getUsers(auth.token);
		dispatch(adminUserListSuccess(data));
	} catch (error) {
		dispatch(adminUserListFail(parseErrorMsg(error)));
	}
};

// Activate user account
export const activateUserAccount = (id) => (dispatch, getState) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { auth } = getState();
			const { data } = await adminUserApi.activateUser(auth.token, id);
			dispatch({ type: ADMIN_USER_ACTIVATE, payload: data });
			dispatch(createNotification('Activated user account', 'success'));
			resolve(data);
		} catch (error) {
			dispatch(createNotification(parseErrorMsg(error), 'error'));
			reject(parseErrorMsg(error));
		}
	});
};

// Deactivate user account
export const deactivateUserAccount = (id) => (dispatch, getState) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { auth } = getState();
			const { data } = await adminUserApi.deactivateUser(auth.token, id);
			dispatch({ type: ADMIN_USER_DEACTIVATE, payload: data });
			dispatch(createNotification('Deactivated user account', 'success'));
			resolve(data);
		} catch (error) {
			dispatch(createNotification(parseErrorMsg(error), 'error'));
			reject(parseErrorMsg(error));
		}
	});
};

// Set user as admin
export const makeUserAdmin = (id) => (dispatch, getState) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { auth } = getState();
			const { data } = await adminUserApi.makeAdmin(auth.token, id);
			dispatch({ type: ADMIN_USER_MAKE_ADMIN, payload: data });
			dispatch(createNotification('Switched user to admin', 'success'));
			resolve(data);
		} catch (error) {
			dispatch(createNotification(parseErrorMsg(error), 'error'));
			reject(parseErrorMsg(error));
		}
	});
};

// Set user as subscriber
export const makeUserSubscriber = (id) => (dispatch, getState) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { auth } = getState();
			const { data } = await adminUserApi.makeSubscriber(auth.token, id);
			dispatch({ type: ADMIN_USER_MAKE_SUBSCRIBER, payload: data });
			dispatch(createNotification('Switched user to subscriber', 'success'));
			resolve(data);
		} catch (error) {
			dispatch(createNotification(parseErrorMsg(error), 'error'));
			reject(parseErrorMsg(error));
		}
	});
};
