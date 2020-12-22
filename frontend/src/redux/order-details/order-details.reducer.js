import {
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
} from './order-details.types';

const INITIAL_STATE = {
	loading: false,
	error: null,
	order: {},
};

const orderDetailsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
			return { ...state, loading: true };

		case ORDER_DETAILS_SUCCESS:
			return { ...state, loading: false, error: null, order: action.payload };

		case ORDER_DETAILS_FAIL:
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
};

export default orderDetailsReducer;
