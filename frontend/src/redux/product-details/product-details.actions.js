import {
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
} from './product-details.types';
import productApi from '../../api/product/product.api';
import parseErrorMsg from '../../utils/parseErrorMsg';

// Fetch product details
export const productDetailsRequest = () => ({ type: PRODUCT_DETAILS_REQUEST });
export const productDetailsSuccess = (data) => ({
	type: PRODUCT_DETAILS_SUCCESS,
	payload: data,
});
export const productDetailsFail = (error) => ({
	type: PRODUCT_DETAILS_FAIL,
	payload: error,
});
export const fetchProductDetails = (slug, id) => async (dispatch) => {
	dispatch(productDetailsRequest());
	try {
		const { data } = await productApi.getProductById(slug, id);
		dispatch(productDetailsSuccess(data));
	} catch (error) {
		dispatch(productDetailsFail(parseErrorMsg(error)));
	}
};
