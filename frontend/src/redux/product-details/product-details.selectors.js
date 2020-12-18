import { createSelector } from 'reselect';

const selectProductDetails = (state) => state.productDetails;

// Select is product details loading
export const selectLoading = createSelector(
	[selectProductDetails],
	(productDetails) => productDetails.loading
);

// Select product
export const selectProduct = createSelector(
	[selectProductDetails],
	(productDetails) => productDetails.product
);

// Select product details error
export const selectError = createSelector(
	[selectProductDetails],
	(productDetails) => productDetails.error
);
