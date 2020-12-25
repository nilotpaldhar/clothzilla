import {
	ADMIN_ORDER_LIST_REQUEST,
	ADMIN_ORDER_LIST_SUCCESS,
	ADMIN_ORDER_LIST_FAIL,
} from './admin-order-list.types';
import adminOrderApi from '../../api/admin-order/admin-order.api';
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
