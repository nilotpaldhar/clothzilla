import {
	GET_AVATAR_REQUEST,
	GET_AVATAR_SUCCESS,
	GET_AVATAR_FAIL,
} from './user-avatar.types';
import profileApi from '../../api/profile/profile.api';
import parseErrorMsg from '../../utils/parseErrorMsg';

// Fetch currently logged in user profile avatar
export const getAvatarRequest = () => ({ type: GET_AVATAR_REQUEST });
export const getAvatarSuccess = (avatarUrl) => ({
	type: GET_AVATAR_SUCCESS,
	payload: avatarUrl,
});
export const getAvatarFail = (error) => ({
	type: GET_AVATAR_FAIL,
	payload: error,
});
export const fetchAvatar = () => async (dispatch, getState) => {
	dispatch(getAvatarRequest());

	try {
		const { auth } = getState();
		const { data } = await profileApi.getAvatar(auth.token);
		dispatch(getAvatarSuccess(data.avatar_url));
	} catch (error) {
		dispatch(getAvatarFail(parseErrorMsg(error)));
	}
};
