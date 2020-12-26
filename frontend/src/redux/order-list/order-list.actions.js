import {
	GET_ORDER_LIST_REQUEST,
	GET_ORDER_LIST_SUCCESS,
	GET_ORDER_LIST_FAIL,
	CANCEL_ORDER,
} from './order-list.types';
import orderApi from '../../api/order/order.api';
import { createNotification } from '../notification/notification.actions';
import parseErrorMsg from '../../utils/parseErrorMsg';

// Get all orders of logged in user
export const getOrderListRequest = () => ({ type: GET_ORDER_LIST_REQUEST });
export const getOrderListSuccess = (data) => ({
	type: GET_ORDER_LIST_SUCCESS,
	payload: data,
});
export const getOrderListFail = (error) => ({
	type: GET_ORDER_LIST_FAIL,
	payload: error,
});
export const fetchOrders = () => async (dispatch, getState) => {
	dispatch(getOrderListRequest());

	try {
		const { auth } = getState();
		const { data } = await orderApi.getAllOrders(auth.token);
		dispatch(getOrderListSuccess(data));
	} catch (error) {
		dispatch(getOrderListFail(parseErrorMsg(error)));
	}
};

// Cancel order
export const cancelOrder = (id) => (dispatch, getState) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { auth } = getState();
			const { data } = await orderApi.cancel(auth.token, id);
			dispatch({ type: CANCEL_ORDER, payload: data });
			dispatch(createNotification('Order canceled successfully', 'success'));
			resolve(data);
		} catch (error) {
			dispatch(createNotification(parseErrorMsg(error), 'error'));
			reject(parseErrorMsg(error));
		}
	});
};
