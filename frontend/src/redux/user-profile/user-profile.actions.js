import {
	GET_USER_PROFILE_REQUEST,
	GET_USER_PROFILE_SUCCESS,
	GET_USER_PROFILE_FAIL,
	UPDATE_USER_PROFILE_REQUEST,
	UPDATE_USER_PROFILE_SUCCESS,
	UPDATE_USER_PROFILE_FAIL,
} from './user-profile.types';

import profileApi from '../../api/profile/profile.api';
import { createNotification } from '../notification/notification.actions';
import parseErrorMsg from '../../utils/parseErrorMsg';

// Fecth user profile details
export const getUserProfileRequest = () => ({ type: GET_USER_PROFILE_REQUEST });
export const getUserProfileSuccess = (data) => ({
	type: GET_USER_PROFILE_SUCCESS,
	payload: data,
});
export const getUserProfileFail = (error) => ({
	type: GET_USER_PROFILE_FAIL,
	payload: error,
});
export const fetchUserProfile = () => async (dispatch, getState) => {
	dispatch(getUserProfileRequest());
	try {
		const { auth } = getState();
		const { data } = await profileApi.getUserProfile(auth.token);
		dispatch(getUserProfileSuccess(data));
	} catch (error) {
		dispatch(getUserProfileFail(parseErrorMsg(error)));
	}
};

// Update user address
export const updateUserProfileRequest = () => ({
	type: UPDATE_USER_PROFILE_REQUEST,
});
export const updateUserProfileSuccess = (data) => ({
	type: UPDATE_USER_PROFILE_SUCCESS,
	payload: data,
});
export const updateUserProfileFail = (error) => ({
	type: UPDATE_USER_PROFILE_FAIL,
	payload: error,
});
export const updateUserProfile = (details) => (dispatch, getState) => {
	dispatch(updateUserProfileRequest());
	return new Promise(async (resolve, reject) => {
		try {
			const { auth } = getState();
			const { data } = await profileApi.updateUserProfile(auth.token, details);
			dispatch(updateUserProfileSuccess(data));
			dispatch(fetchUserProfile());
			dispatch(createNotification('Profile updated successfully', 'success'));
			resolve(data);
		} catch (error) {
			dispatch(updateUserProfileFail(parseErrorMsg(error)));
			dispatch(createNotification(parseErrorMsg(error), 'error'));
			reject(parseErrorMsg(error));
		}
	});
};
