import { createSelector } from 'reselect';

const selectAdminProduct = (state) => state.adminProduct;

// Select is admin product creating
export const selectProductCreating = createSelector(
	[selectAdminProduct],
	(adminProduct) => adminProduct.creating
);

// Select admin created product
export const selectCreatedProduct = createSelector(
	[selectAdminProduct],
	(adminProduct) => adminProduct.createdProduct
);

// Select admin created product success
export const selectCreatedProductSuccess = createSelector(
	[selectAdminProduct],
	(adminProduct) => adminProduct.createSuccess
);

// Select admin product create error
export const selectCreatedProductError = createSelector(
	[selectAdminProduct],
	(adminProduct) => adminProduct.createError
);
