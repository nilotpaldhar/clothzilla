import {
	ADMIN_PRODUCT_CREATE_REQUEST,
	ADMIN_PRODUCT_CREATE_SUCCESS,
	ADMIN_PRODUCT_CREATE_FAIL,
	ADMIN_PRODUCT_RESET,
} from './admin-product.types';
import adminProductApi from '../../api/admin-product/admin-product.api';
import { createNotification } from '../notification/notification.actions';
import parseErrorMsg from '../../utils/parseErrorMsg';

// Create new product
export const adminProductCreateRequest = () => ({
	type: ADMIN_PRODUCT_CREATE_REQUEST,
});
export const adminProductCreateSuccess = (data) => ({
	type: ADMIN_PRODUCT_CREATE_SUCCESS,
	payload: data,
});
export const adminProductCreateFail = (error) => ({
	type: ADMIN_PRODUCT_CREATE_FAIL,
	payload: error,
});
export const createProduct = () => async (dispatch, getState) => {
	dispatch(adminProductCreateRequest());
	try {
		const { auth } = getState();
		const { data } = await adminProductApi.createProduct(auth.token);
		dispatch(adminProductCreateSuccess(data));
		dispatch(createNotification('Product created successfully', 'success'));
	} catch (error) {
		console.log(error);
		dispatch(adminProductCreateFail(parseErrorMsg(error)));
		dispatch(createNotification(parseErrorMsg(error), 'error'));
	}
};

// Reset admin product state
export const resetAdminProduct = () => ({ type: ADMIN_PRODUCT_RESET });
