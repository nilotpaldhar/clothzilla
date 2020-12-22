import {
	GET_ORDER_LIST_REQUEST,
	GET_ORDER_LIST_SUCCESS,
	GET_ORDER_LIST_FAIL,
} from './order-list.types';

const INITIAL_STATE = {
	loadingOrders: false,
	ordersError: null,
	orders: [],
};

const orderListReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_ORDER_LIST_REQUEST:
			return { ...state, loadingOrders: true };

		case GET_ORDER_LIST_SUCCESS:
			return {
				...state,
				loadingOrders: false,
				ordersError: null,
				orders: action.payload,
			};

		case GET_ORDER_LIST_FAIL:
			return { ...state, loadingOrders: false, ordersError: action.payload };

		default:
			return state;
	}
};

export default orderListReducer;
