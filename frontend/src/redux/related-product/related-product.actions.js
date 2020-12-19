import {
	RELATED_PRODUCT_REQUEST,
	RELATED_PRODUCT_SUCCESS,
	RELATED_PRODUCT_FAIL,
} from './related-product.types';
import productApi from '../../api/product/product.api';
import parseErrorMsg from '../../utils/parseErrorMsg';

// Fetch related products
// Fetch products from the backend
export const relatedProductRequest = () => ({
	type: RELATED_PRODUCT_REQUEST,
});
export const relatedProductSuccess = (data) => ({
	type: RELATED_PRODUCT_SUCCESS,
	payload: data,
});
export const relatedProductFail = (error) => ({
	type: RELATED_PRODUCT_FAIL,
	payload: error,
});
export const fetchRelatedProduct = (slug, id) => async (dispatch) => {
	try {
		dispatch(relatedProductRequest());
		const { data } = await productApi.getRelatedProduct(slug, id);
		dispatch(relatedProductSuccess(data));
	} catch (error) {
		dispatch(relatedProductFail(parseErrorMsg(error)));
	}
};
