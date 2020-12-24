import { createSelector } from 'reselect';

const selectSearch = (state) => state.search;

// Select search bar hidden
export const selectSearchbarHidden = createSelector(
	[selectSearch],
	(search) => search.hidden
);

// Select search query
export const selectSearchQuery = createSelector(
	[selectSearch],
	(search) => search.query
);

// Select search loading state
export const selectSearchLoading = createSelector(
	[selectSearch],
	(search) => search.loading
);

// Select search result
export const selectSearchResult = createSelector(
	[selectSearch],
	(search) => search.results
);

// Select search error
export const selectSearchError = createSelector(
	[selectSearch],
	(search) => search.error
);
