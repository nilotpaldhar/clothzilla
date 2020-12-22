import {
	ADD_ITEM_TO_CART,
	REMOVE_ITEM_FROM_CART,
	CLEAR_ITEM_FROM_CART,
	RESET_CART,
	SAVE_SHIPPING_ADDRESS,
	SAVE_PAYMENT_METHOD,
} from './cart.types';
import { addItem, removeItem, clearItem } from './cart.utils';

const INITIAL_STATE = {
	items: [],
	shippingAddress: {},
	paymentMethod: '',
};

const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_ITEM_TO_CART:
			return { ...state, items: addItem(state.items, action.payload) };

		case REMOVE_ITEM_FROM_CART:
			return { ...state, items: removeItem(state.items, action.payload) };

		case CLEAR_ITEM_FROM_CART:
			return { ...state, items: clearItem(state.items, action.payload) };

		case SAVE_SHIPPING_ADDRESS:
			return { ...state, shippingAddress: action.payload };

		case SAVE_PAYMENT_METHOD:
			return { ...state, paymentMethod: action.payload };

		case RESET_CART:
			return { ...state, items: [], shippingAddress: {}, paymentMethod: '' };

		default:
			return state;
	}
};

export default cartReducer;
