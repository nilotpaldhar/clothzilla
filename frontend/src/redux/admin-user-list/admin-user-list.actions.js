import {
	ADMIN_USER_LIST_REQUEST,
	ADMIN_USER_LIST_SUCCESS,
	ADMIN_USER_LIST_FAIL,
} from './admin-user-list.types';
import adminUserApi from '../../api/admin-user/admin-user.api';
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
