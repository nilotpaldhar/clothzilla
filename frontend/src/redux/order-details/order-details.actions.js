import {
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
} from './order-details.types';
import orderApi from '../../api/order/order.api';
import parseErrorMsg from '../../utils/parseErrorMsg';

// Fetch order details
export const orderDetailsRequest = () => ({ type: ORDER_DETAILS_REQUEST });
export const orderDetailsSuccess = (data) => ({
	type: ORDER_DETAILS_SUCCESS,
	payload: data,
});
export const orderDetailsFail = (error) => ({
	type: ORDER_DETAILS_FAIL,
	payload: error,
});
export const fetchOrderDetails = (id) => async (dispatch, getState) => {
	dispatch(orderDetailsRequest());
	try {
		const { auth } = getState();
		const { data } = await orderApi.getOrderById(auth.token, id);
		dispatch(orderDetailsSuccess(data));
	} catch (error) {
		dispatch(orderDetailsFail(parseErrorMsg(error)));
	}
};
