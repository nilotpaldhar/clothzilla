import {
	ADMIN_PRODUCT_LIST_REQUEST,
	ADMIN_PRODUCT_LIST_SUCCESS,
	ADMIN_PRODUCT_LIST_FAIL,
} from './admin-product-list.types';
import adminProductApi from '../../api/admin-product/admin-product.api';
import parseErrorMsg from '../../utils/parseErrorMsg';

// Fetch all products for admin
export const adminProductListRequest = () => ({
	type: ADMIN_PRODUCT_LIST_REQUEST,
});
export const adminProductListSuccess = (data) => ({
	type: ADMIN_PRODUCT_LIST_SUCCESS,
	payload: data,
});
export const adminProductListFail = (error) => ({
	type: ADMIN_PRODUCT_LIST_FAIL,
	payload: error,
});
export const fetchAdminProducts = () => async (dispatch, getState) => {
	dispatch(adminProductListRequest());
	try {
		const { auth } = getState();
		const { data } = await adminProductApi.getProducts(auth.token);
		dispatch(adminProductListSuccess(data));
	} catch (error) {
		dispatch(adminProductListFail(parseErrorMsg(error)));
	}
};
