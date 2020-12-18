import { createSelector } from 'reselect';

const selectProductList = (state) => state.productList;

// Select is product loading
export const selectLoading = createSelector(
	[selectProductList],
	(productList) => productList.loading
);

// Select products
export const selectProducts = createSelector(
	[selectProductList],
	(productList) => productList.products
);

// Select product load more state
export const selectLoadMore = createSelector(
	[selectProductList],
	(productList) => productList.loadMore
);

// Select total product page
export const selectTotalPage = createSelector(
	[selectProductList],
	(productList) => productList.pages
);

// Select current product page
export const selectCurrentPage = createSelector(
	[selectProductList],
	(productList) => productList.page
);

// Select product error
export const selectError = createSelector(
	[selectProductList],
	(productList) => productList.error
);
