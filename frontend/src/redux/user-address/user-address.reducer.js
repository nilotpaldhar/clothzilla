import {
	GET_USER_ADDRESS_REQUEST,
	GET_USER_ADDRESS_SUCCESS,
	GET_USER_ADDRESS_FAIL,
	UPDATE_USER_ADDRESS_REQUEST,
	UPDATE_USER_ADDRESS_SUCCESS,
	UPDATE_USER_ADDRESS_FAIL,
} from './user-address.types';

const INITIAL_STATE = {
	loading: false,
	updating: false,
	error: null,
	shippingAddress: {},
};

const userAddressReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_USER_ADDRESS_REQUEST:
			return { ...state, loading: true };

		case UPDATE_USER_ADDRESS_REQUEST:
			return { ...state, updating: true };

		case GET_USER_ADDRESS_SUCCESS:
		case UPDATE_USER_ADDRESS_SUCCESS:
			return {
				...state,
				loading: false,
				updating: false,
				error: null,
				shippingAddress: action.payload,
			};

		case GET_USER_ADDRESS_FAIL:
		case UPDATE_USER_ADDRESS_FAIL:
			return {
				...state,
				loading: false,
				updating: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default userAddressReducer;
