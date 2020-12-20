import { createSelector } from 'reselect';

const selectCart = (state) => state.cart;

// Select cart items
export const seletctCartItems = createSelector(
	[selectCart],
	(cart) => cart.items
);

// Select total cart items
export const seletctCartItemsCount = createSelector(
	[seletctCartItems],
	(items) => items.reduce((acc, cartItem) => cartItem.quantity + acc, 0)
);

// Select cart total
export const seletctCartTotal = createSelector([seletctCartItems], (items) => {
	return Number(
		items.reduce((acc, cartItem) => Number(cartItem.total) + acc, 0)
	).toFixed(2);
});
