import {
	ADD_ITEM_TO_CART,
	REMOVE_ITEM_FROM_CART,
	CLEAR_ITEM_FROM_CART,
	CLEAR_CART,
	SAVE_SHIPPING_ADDRESS,
	SAVE_PAYMENT_METHOD,
} from './cart.types';
import { createNotification } from '../notification/notification.actions';

// Add new item to cart
export const addItemToCart = (product) => (dispatch) => {
	dispatch({
		type: ADD_ITEM_TO_CART,
		payload: product,
	});
	dispatch(createNotification(`${product.name} added to your cart`, 'success'));
};

// Remove item from cart
export const removeItemFromCart = (product) => (dispatch) => {
	dispatch({
		type: REMOVE_ITEM_FROM_CART,
		payload: product,
	});
	dispatch(
		createNotification(`${product.name} removed from your cart`, 'success')
	);
};

// Clear item from cart
export const clearItemFromCart = (product) => (dispatch) => {
	dispatch({
		type: CLEAR_ITEM_FROM_CART,
		payload: product,
	});
	dispatch(
		createNotification(`${product.name} removed from your cart`, 'success')
	);
};

// Clear cart
export const clearCart = () => ({ type: CLEAR_CART });

// Save shipping address
export const saveShippingAddress = (address) => ({
	type: SAVE_SHIPPING_ADDRESS,
	payload: address,
});

// Save payment method
export const savePaymentMethod = (method) => ({
	type: SAVE_PAYMENT_METHOD,
	payload: method,
});
