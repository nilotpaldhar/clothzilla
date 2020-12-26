import {
	ADMIN_PRODUCT_LIST_REQUEST,
	ADMIN_PRODUCT_LIST_SUCCESS,
	ADMIN_PRODUCT_LIST_FAIL,
	ADMIN_PRODUCT_DELETE,
} from './admin-product-list.types';
import adminProductApi from '../../api/admin-product/admin-product.api';
import { createNotification } from '../notification/notification.actions';
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

// Delete a product
export const deleteProduct = (id) => (dispatch, getState) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { auth } = getState();
			await adminProductApi.deleteProduct(auth.token, id);
			dispatch({ type: ADMIN_PRODUCT_DELETE, payload: id });
			dispatch(createNotification('Product deleted successfully', 'success'));
			resolve();
		} catch (error) {
			dispatch(createNotification(parseErrorMsg(error), 'error'));
			reject(parseErrorMsg(error));
		}
	});
};
