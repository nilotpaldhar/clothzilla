import {
	ADMIN_ORDER_DETAILS_REQUEST,
	ADMIN_ORDER_DETAILS_SUCCESS,
	ADMIN_ORDER_DETAILS_FAIL,
} from './admin-order-details.types';

const INITIAL_STATE = {
	loading: false,
	error: null,
	order: {},
};

const adminOrderDetailsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADMIN_ORDER_DETAILS_REQUEST:
			return { ...state, loading: true };

		case ADMIN_ORDER_DETAILS_SUCCESS:
			return { ...state, loading: false, error: null, order: action.payload };

		case ADMIN_ORDER_DETAILS_FAIL:
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
};

export default adminOrderDetailsReducer;
