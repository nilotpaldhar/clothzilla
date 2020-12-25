import { createSelector } from 'reselect';

const selectCategoryList = (state) => state.categoryList;

// Select is categories loading
export const selectLoading = createSelector(
	[selectCategoryList],
	(categoryList) => categoryList.loading
);

// Select categories
export const selectCategories = createSelector(
	[selectCategoryList],
	(categoryList) => categoryList.categories
);

// Select active category
export const selectActiveCategory = createSelector(
	[selectCategoryList],
	(categoryList) => categoryList.activeCategory
);

// Select active category title
export const selectActiveCategoryTitle = createSelector(
	[selectCategoryList],
	(categoryList) => categoryList.activeCategoryTitle
);

// Select categories error
export const selectError = createSelector(
	[selectCategoryList],
	(categoryList) => categoryList.error
);

// Select editing
export const selectEditing = createSelector(
	[selectCategoryList],
	(categoryList) => categoryList.editing
);

// Select edit category
export const selectEditCategory = createSelector(
	[selectCategoryList],
	(categoryList) => categoryList.editCategory
);
