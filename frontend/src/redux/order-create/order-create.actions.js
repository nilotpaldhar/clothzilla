import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
} from './order-create.types';
import orderApi from '../../api/order/order.api';
import parseErrorMsg from '../../utils/parseErrorMsg';
import { resetCart } from '../cart/cart.actions';
import { createNotification } from '../notification/notification.actions';

// Create a new order
export const createOrderRequest = () => ({ type: ORDER_CREATE_REQUEST });
export const createOrderSuccess = (data) => ({
	type: ORDER_CREATE_SUCCESS,
	payload: data,
});
export const createOrderFail = (error) => ({
	type: ORDER_CREATE_FAIL,
	payload: error,
});
export const createOrder = (order) => async (dispatch, getState) => {
	dispatch(createOrderRequest());

	try {
		const { auth } = getState();
		const { data } = await orderApi.createOrder(auth.token, order);
		dispatch(createOrderSuccess(data));
		dispatch(resetCart());
		dispatch(createNotification('Successfully placed order', 'success'));
	} catch (error) {
		const errorMsg = parseErrorMsg(error);
		dispatch(createOrderFail(errorMsg));
		dispatch(createNotification(errorMsg, 'error'));
	}
};
