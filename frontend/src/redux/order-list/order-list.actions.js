import {
	GET_ORDER_LIST_REQUEST,
	GET_ORDER_LIST_SUCCESS,
	GET_ORDER_LIST_FAIL,
} from './order-list.types';
import orderApi from '../../api/order/order.api';
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
