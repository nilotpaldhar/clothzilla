import {
	GET_USER_ADDRESS_REQUEST,
	GET_USER_ADDRESS_SUCCESS,
	GET_USER_ADDRESS_FAIL,
	UPDATE_USER_ADDRESS_REQUEST,
	UPDATE_USER_ADDRESS_SUCCESS,
	UPDATE_USER_ADDRESS_FAIL,
} from './user-address.types';
import profileApi from '../../api/profile/profile.api';
import { createNotification } from '../notification/notification.actions';
import parseErrorMsg from '../../utils/parseErrorMsg';

// Fecth user address
export const getUserAddressRequest = () => ({ type: GET_USER_ADDRESS_REQUEST });
export const getUserAddressSuccess = (data) => ({
	type: GET_USER_ADDRESS_SUCCESS,
	payload: data,
});
export const getUserAddressFail = (error) => ({
	type: GET_USER_ADDRESS_FAIL,
	payload: error,
});
export const fetchUserAddress = () => async (dispatch, getState) => {
	dispatch(getUserAddressRequest());
	try {
		const { auth } = getState();
		const { data } = await profileApi.getUserAddress(auth.token);
		dispatch(getUserAddressSuccess(data));
	} catch (error) {
		dispatch(getUserAddressFail(parseErrorMsg(error)));
	}
};

// Update user address
export const updateUserAddressRequest = () => ({
	type: UPDATE_USER_ADDRESS_REQUEST,
});
export const updateUserAddressSuccess = (data) => ({
	type: UPDATE_USER_ADDRESS_SUCCESS,
	payload: data,
});
export const updateUserAddressFail = (error) => ({
	type: UPDATE_USER_ADDRESS_FAIL,
	payload: error,
});
export const updateUserAddress = (address) => (dispatch, getState) => {
	dispatch(updateUserAddressRequest());
	return new Promise(async (resolve, reject) => {
		try {
			const { auth } = getState();
			const { data } = await profileApi.updateUserAddress(auth.token, address);
			dispatch(updateUserAddressSuccess(data));
			dispatch(fetchUserAddress());
			dispatch(createNotification('Address updated successfully', 'success'));
			resolve(data);
		} catch (error) {
			dispatch(updateUserAddressFail(parseErrorMsg(error)));
			dispatch(createNotification(parseErrorMsg(error), 'error'));
			reject(parseErrorMsg(error));
		}
	});
};
