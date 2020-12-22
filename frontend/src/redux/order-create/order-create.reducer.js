import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
} from './order-create.types';

const INITIAL_STATE = {
	loading: false,
	success: false,
	error: null,
	order: {},
};

const orderCreateReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return { ...state, loading: true };

		case ORDER_CREATE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				order: action.payload,
				error: null,
			};

		case ORDER_CREATE_FAIL:
			return {
				...state,
				loading: false,
				success: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default orderCreateReducer;
