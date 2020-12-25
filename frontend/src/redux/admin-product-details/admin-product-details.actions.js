import {
	ADMIN_PRODUCT_DETAILS_REQUEST,
	ADMIN_PRODUCT_DETAILS_SUCCESS,
	ADMIN_PRODUCT_DETAILS_FAIL,
} from './admin-product-details.types';
import adminProductApi from '../../api/admin-product/admin-product.api';
import parseErrorMsg from '../../utils/parseErrorMsg';

// Fetch product details for admin
export const adminProductDetailsRequest = () => ({
	type: ADMIN_PRODUCT_DETAILS_REQUEST,
});
export const adminProductDetailsSuccess = (data) => ({
	type: ADMIN_PRODUCT_DETAILS_SUCCESS,
	payload: data,
});
export const adminProductDetailsFail = (error) => ({
	type: ADMIN_PRODUCT_DETAILS_FAIL,
	payload: error,
});
export const fetchAdminProductDetails = (id) => async (dispatch, getState) => {
	dispatch(adminProductDetailsRequest());
	try {
		const { auth } = getState();
		const { data } = await adminProductApi.getProductById(auth.token, id);
		dispatch(adminProductDetailsSuccess(data));
	} catch (error) {
		dispatch(adminProductDetailsFail(parseErrorMsg(error)));
	}
};
