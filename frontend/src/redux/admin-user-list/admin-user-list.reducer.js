import {
	ADMIN_USER_LIST_REQUEST,
	ADMIN_USER_LIST_SUCCESS,
	ADMIN_USER_LIST_FAIL,
} from './admin-user-list.types';

const INITIAL_STATE = {
	loading: false,
	error: null,
	users: [],
};

const adminUserListReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADMIN_USER_LIST_REQUEST:
			return { ...state, loading: true };

		case ADMIN_USER_LIST_SUCCESS:
			return { ...state, loading: false, error: null, users: action.payload };

		case ADMIN_USER_LIST_FAIL:
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
};

export default adminUserListReducer;
