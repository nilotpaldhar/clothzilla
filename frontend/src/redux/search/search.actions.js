import {
	SET_SEARCH_QUERY,
	CLEAR_SEARCH_QUERY,
	SEARCH_REQUEST,
	SEARCH_SUCCESS,
	SEARCH_FAIL,
	CLEAR_SEARCH_RESULT,
	SHOW_SEARCHBAR,
	HIDE_SEARCHBAR,
} from './search.types';
import productApi from '../../api/product/product.api';
import parseErrorMsg from '../../utils/parseErrorMsg';

// Show search bar
export const showSearchbar = () => ({ type: SHOW_SEARCHBAR });

// Hide search bar
export const hideSearchbar = () => ({ type: HIDE_SEARCHBAR });

// Set search query
export const setSearchQuery = (query) => ({
	type: SET_SEARCH_QUERY,
	payload: query,
});

// Clear search query
export const clearSearchQuery = () => ({ type: CLEAR_SEARCH_QUERY });

// Search products
export const searchRequest = () => ({ type: SEARCH_REQUEST });
export const searchSuccess = (results) => ({
	type: SEARCH_SUCCESS,
	payload: results,
});
export const searchFail = (error) => ({ type: SEARCH_FAIL, payload: error });
export const searchAsync = (query) => async (dispatch) => {
	dispatch(searchRequest());
	try {
		const { data } = await productApi.search(query);
		dispatch(searchSuccess(data.products));
	} catch (error) {
		dispatch(searchFail(parseErrorMsg(error)));
	}
};

// Clear search result
export const clearSearchResult = () => ({ type: CLEAR_SEARCH_RESULT });
