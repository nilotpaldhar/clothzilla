import {
	GET_AVATAR_REQUEST,
	GET_AVATAR_SUCCESS,
	GET_AVATAR_FAIL,
} from './user-avatar.types';

const INITIAL_STATE = {
	loading: false,
	error: null,
	avatarUrl: '',
};

const userAvatarReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_AVATAR_REQUEST:
			return { ...state, loading: true };

		case GET_AVATAR_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				avatarUrl: action.payload,
			};

		case GET_AVATAR_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default userAvatarReducer;
