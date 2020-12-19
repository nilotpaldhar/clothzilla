import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_LOAD_MORE_REQUEST,
	PRODUCT_LOAD_MORE_SUCCESS,
	PRODUCT_LOAD_MORE_FAIL,
} from './product-list.types';
import parseErrorMsg from '../../utils/parseErrorMsg';
import productApi from '../../api/product/product.api';

// Fetch products from the backend
export const productListRequest = () => ({
	type: PRODUCT_LIST_REQUEST,
});
export const productListSuccess = (data) => ({
	type: PRODUCT_LIST_SUCCESS,
	payload: data,
});
export const productListFail = (error) => ({
	type: PRODUCT_LIST_FAIL,
	payload: error,
});
export const fetchProductList = (category) => async (dispatch) => {
	try {
		dispatch(productListRequest());
		const { data } = await productApi.getProducts(null, category);
		dispatch(productListSuccess(data));
	} catch (error) {
		dispatch(productListFail(parseErrorMsg(error)));
	}
};

// Load more products
export const productLoadMoreRequest = () => ({
	type: PRODUCT_LOAD_MORE_REQUEST,
});
export const productLoadMoreSuccess = (data) => ({
	type: PRODUCT_LOAD_MORE_SUCCESS,
	payload: data,
});
export const productLoadMoreFail = (error) => ({
	type: PRODUCT_LOAD_MORE_FAIL,
	payload: error,
});
export const loadMoreProducts = (page, category) => async (dispatch) => {
	try {
		dispatch(productLoadMoreRequest());
		const { data } = await productApi.getProducts(page, category);
		dispatch(productLoadMoreSuccess(data));
	} catch (error) {
		dispatch(productLoadMoreFail(parseErrorMsg(error)));
	}
};
