import {
	ADMIN_ORDER_DETAILS_REQUEST,
	ADMIN_ORDER_DETAILS_SUCCESS,
	ADMIN_ORDER_DETAILS_FAIL,
	ADMIN_ORDER_DELIVER_REQUEST,
	ADMIN_ORDER_DELIVER_SUCCESS,
	ADMIN_ORDER_DELIVER_FAIL,
} from './admin-order-details.types';
import adminOrderApi from '../../api/admin-order/admin-order.api';
import { createNotification } from '../notification/notification.actions';
import parseErrorMsg from '../../utils/parseErrorMsg';

// Fetch order details for admin
export const adminOrderDetailsRequest = () => ({
	type: ADMIN_ORDER_DETAILS_REQUEST,
});
export const adminOrderDetailsSuccess = (data) => ({
	type: ADMIN_ORDER_DETAILS_SUCCESS,
	payload: data,
});
export const adminOrderDetailsFail = (error) => ({
	type: ADMIN_ORDER_DETAILS_FAIL,
	payload: error,
});
export const fetchAdminOrderDetails = (id) => async (dispatch, getState) => {
	dispatch(adminOrderDetailsRequest());
	try {
		const { auth } = getState();
		const { data } = await adminOrderApi.getOderById(auth.token, id);
		dispatch(adminOrderDetailsSuccess(data));
	} catch (error) {
		dispatch(adminOrderDetailsFail(parseErrorMsg(error)));
	}
};

// Mark order as delivered
export const adminOrderDeliverRequest = () => ({
	type: ADMIN_ORDER_DELIVER_REQUEST,
});
export const adminOrderDeliverSuccess = (data) => ({
	type: ADMIN_ORDER_DELIVER_SUCCESS,
	payload: data,
});
export const adminOrderDeliverFail = (error) => ({
	type: ADMIN_ORDER_DELIVER_FAIL,
	payload: error,
});
export const deliverOrder = (id) => async (dispatch, getState) => {
	dispatch(adminOrderDeliverRequest());
	try {
		const { auth } = getState();
		const { data } = await adminOrderApi.deliver(auth.token, id);
		dispatch(adminOrderDeliverSuccess(data));
		dispatch(
			createNotification('Successfully marked product as delivered', 'success')
		);
	} catch (error) {
		dispatch(adminOrderDeliverFail(parseErrorMsg(error)));
		dispatch(createNotification(parseErrorMsg(error), 'error'));
	}
};
