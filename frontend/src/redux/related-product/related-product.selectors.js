import { createSelector } from 'reselect';

const selectRelatedProduct = (state) => state.relatedProduct;

// Select is product loading
export const selectLoading = createSelector(
	[selectRelatedProduct],
	(relatedProduct) => relatedProduct.loading
);

// Select products
export const selectRelatedProducts = createSelector(
	[selectRelatedProduct],
	(relatedProduct) => relatedProduct.products
);

// Select product error
export const selectError = createSelector(
	[selectRelatedProduct],
	(relatedProduct) => relatedProduct.error
);
