import {
	ADD_ITEM_TO_CART,
	REMOVE_ITEM_FROM_CART,
	CLEAR_ITEM_FROM_CART,
	CLEAR_CART,
} from './cart.types';
import { addItem, removeItem, clearItem } from './cart.utils';

const INITIAL_STATE = {
	items: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_ITEM_TO_CART:
			return { ...state, items: addItem(state.items, action.payload) };

		case REMOVE_ITEM_FROM_CART:
			return { ...state, items: removeItem(state.items, action.payload) };

		case CLEAR_ITEM_FROM_CART:
			return { ...state, items: clearItem(state.items, action.payload) };

		case CLEAR_CART:
			return { ...state, items: [] };

		default:
			return state;
	}
};

export default cartReducer;
