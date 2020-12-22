import { createSelector } from 'reselect';

const selectCart = (state) => state.cart;

// Select cart items
export const selectCartItems = createSelector(
	[selectCart],
	(cart) => cart.items
);

// Select total cart items count
export const selectCartItemsCount = createSelector([selectCartItems], (items) =>
	items.reduce((acc, cartItem) => cartItem.quantity + acc, 0)
);

// Select shipping address
export const selectShippingAddress = createSelector(
	[selectCart],
	(cart) => cart.shippingAddress
);

// Select payment method
export const selectPaymentMethod = createSelector(
	[selectCart],
	(cart) => cart.paymentMethod
);

// Select whether finished all steps or not
export const selectFinishedAllSteps = createSelector([selectCart], (cart) => {
	// Checking if cart has product
	if (cart.items.length === 0) return false;

	// Checking if selected payment method
	if (cart.paymentMethod === '') return false;

	// Checking if shipping address is not empty
	if (Object.keys(cart.shippingAddress).length === 0) return false;

	return true;
});

// Select cart total
export const selectCartTotal = createSelector([selectCartItems], (items) => {
	return Number(
		items.reduce((acc, cartItem) => Number(cartItem.total) + acc, 0)
	).toFixed(2);
});

// Select total tax
export const selectTotalTax = createSelector([selectCartItems], (items) => {
	return Number(
		items.reduce((acc, cartItem) => Number(cartItem.tax) + acc, 0)
	).toFixed(2);
});

// Select total price before shipping
export const selectTotalPriceBeforeShip = createSelector(
	[selectCartTotal, selectTotalTax],
	(cartTotal, totalTax) => Number(cartTotal) + Number(totalTax)
);

// Select shipping price
export const selectShippingPrice = createSelector(
	[selectTotalPriceBeforeShip],
	(totalPrice) => (Number(totalPrice) > 100 ? 0.0 : 100.0)
);

// Select total price
export const selectTotalPrice = createSelector(
	[selectCartTotal, selectTotalTax, selectShippingPrice],
	(cartTotal, totalTax, ship) =>
		(Number(cartTotal) + Number(totalTax) + ship).toFixed(2)
);
