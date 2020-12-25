import { createSelector } from 'reselect';

const selectAdminProductUpdate = (state) => state.adminProductUpdate;

// Select product update loading state
export const selectProductUpdateLoading = createSelector(
	[selectAdminProductUpdate],
	(adminProductUpdate) => adminProductUpdate.loading
);

// Select updated product
export const selectUpdatedProduct = createSelector(
	[selectAdminProductUpdate],
	(adminProductUpdate) => adminProductUpdate.product
);

// Select product update error
export const selectProductUpdateError = createSelector(
	[selectAdminProductUpdate],
	(adminProductUpdate) => adminProductUpdate.error
);
