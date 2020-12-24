import {
	PAYMENT_REQUEST,
	PAYMENT_SUCCESS,
	PAYMENT_FAIL,
} from './payment.types';
import orderApi from '../../api/order/order.api';
import { orderDetailsSuccess } from '../order-details/order-details.actions';
import { createNotification } from '../notification/notification.actions';
import parseErrorMsg from '../../utils/parseErrorMsg';

// Make payment for order
export const paymentRequest = () => ({ type: PAYMENT_REQUEST });
export const paymentSuccess = (result) => ({
	type: PAYMENT_SUCCESS,
	payload: result,
});
export const paymentFail = (error) => ({ type: PAYMENT_FAIL, payload: error });
export const paymentAsync = (method, orderId, paymentDetails) => async (
	dispatch,
	getState
) => {
	dispatch(paymentRequest());
	try {
		const { auth } = getState();
		const { data } = await orderApi.pay(
			auth.token,
			method,
			orderId,
			paymentDetails
		);
		dispatch(paymentSuccess());
		dispatch(orderDetailsSuccess(data));
		dispatch(createNotification('Payment received successfully', 'success'));
	} catch (error) {
		const errorMsg = parseErrorMsg(error);
		dispatch(paymentFail(errorMsg));
		dispatch(createNotification(errorMsg, 'error'));
	}
};
