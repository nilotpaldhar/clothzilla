import {
	ADMIN_ORDER_LIST_REQUEST,
	ADMIN_ORDER_LIST_SUCCESS,
	ADMIN_ORDER_LIST_FAIL,
} from './admin-order-list.types';

const INITIAL_STATE = {
	loading: false,
	error: null,
	orders: [],
};

const adminOrderListReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADMIN_ORDER_LIST_REQUEST:
			return { ...state, loading: true };

		case ADMIN_ORDER_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				orders: action.payload,
			};

		case ADMIN_ORDER_LIST_FAIL:
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
};

export default adminOrderListReducer;
