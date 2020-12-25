import {
	ADMIN_PRODUCT_UPDATE_REQUEST,
	ADMIN_PRODUCT_UPDATE_SUCCESS,
	ADMIN_PRODUCT_UPDATE_FAIL,
} from './admin-product-update.types';
import adminProductApi from '../../api/admin-product/admin-product.api';
import parseErrorMsg from '../../utils/parseErrorMsg';
import { createNotification } from '../notification/notification.actions';

// Update product actions
export const adminProductUpdateRequest = () => ({
	type: ADMIN_PRODUCT_UPDATE_REQUEST,
});
export const adminProductUpdateSuccess = (data) => ({
	type: ADMIN_PRODUCT_UPDATE_SUCCESS,
	payload: data,
});
export const adminProductUpdateFail = (error) => ({
	type: ADMIN_PRODUCT_UPDATE_FAIL,
	payload: error,
});
export const updateProduct = (id, product) => (dispatch, getState) => {
	dispatch(adminProductUpdateRequest());
	return new Promise(async (resolve, reject) => {
		try {
			const { auth } = getState();
			const { data } = await adminProductApi.updateProduct(
				auth.token,
				id,
				product
			);
			dispatch(adminProductUpdateSuccess(data));
			dispatch(createNotification('Product updated successfully', 'success'));
			resolve(data);
		} catch (error) {
			const errorMsg = parseErrorMsg(error);
			dispatch(adminProductUpdateFail(errorMsg));
			dispatch(createNotification(errorMsg, 'error'));
			reject(errorMsg);
		}
	});
};
