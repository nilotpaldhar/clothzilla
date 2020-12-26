import {
	ADMIN_ORDER_LIST_REQUEST,
	ADMIN_ORDER_LIST_SUCCESS,
	ADMIN_ORDER_LIST_FAIL,
	ADMIN_ORDER_DELETE,
} from './admin-order-list.types';
import adminOrderApi from '../../api/admin-order/admin-order.api';
import { createNotification } from '../notification/notification.actions';
import parseErrorMsg from '../../utils/parseErrorMsg';

// Fetch all orders for admin
export const adminOrderListRequest = () => ({
	type: ADMIN_ORDER_LIST_REQUEST,
});
export const adminOrderListSuccess = (data) => ({
	type: ADMIN_ORDER_LIST_SUCCESS,
	payload: data,
});
export const adminOrderListFail = (error) => ({
	type: ADMIN_ORDER_LIST_FAIL,
	payload: error,
});
export const fetchAdminOrders = () => async (dispatch, getState) => {
	dispatch(adminOrderListRequest());
	try {
		const { auth } = getState();
		const { data } = await adminOrderApi.getOders(auth.token);
		dispatch(adminOrderListSuccess(data));
	} catch (error) {
		dispatch(adminOrderListFail(parseErrorMsg(error)));
	}
};

// Delete a order
export const deleteOrder = (id) => (dispatch, getState) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { auth } = getState();
			await adminOrderApi.deleteOrder(auth.token, id);
			dispatch({ type: ADMIN_ORDER_DELETE, payload: id });
			dispatch(createNotification('Order deleted successfully', 'success'));
			resolve();
		} catch (error) {
			dispatch(createNotification(parseErrorMsg(error), 'error'));
			reject(parseErrorMsg(error));
		}
	});
};
