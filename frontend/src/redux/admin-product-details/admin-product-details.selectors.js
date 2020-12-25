import { createSelector } from 'reselect';

const selectAdminProductDetails = (state) => state.adminProductDetails;

// Select is admin product details loading
export const selectProductDetailsLoading = createSelector(
	[selectAdminProductDetails],
	(adminProductDetails) => adminProductDetails.loading
);

// Select admin product details
export const selectProductDetails = createSelector(
	[selectAdminProductDetails],
	(adminProductDetails) => adminProductDetails.product
);

// Select admin product details error
export const selectProductDetailsError = createSelector(
	[selectAdminProductDetails],
	(adminProductDetails) => adminProductDetails.error
);
