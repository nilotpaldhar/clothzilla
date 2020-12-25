import { createSelector } from 'reselect';

const selectAdminProductList = (state) => state.adminProductList;

// Select is admin products loading
export const selectAdminProductsLoading = createSelector(
	[selectAdminProductList],
	(adminProductList) => adminProductList.loading
);

// Select admin products
export const selectAdminProducts = createSelector(
	[selectAdminProductList],
	(adminProductList) => adminProductList.products
);

// Select admin products error
export const selectAdminProductsError = createSelector(
	[selectAdminProductList],
	(adminProductList) => adminProductList.error
);
