import {
	ADMIN_ORDER_DETAILS_REQUEST,
	ADMIN_ORDER_DETAILS_SUCCESS,
	ADMIN_ORDER_DETAILS_FAIL,
} from './admin-order-details.types';
import adminOrderApi from '../../api/admin-order/admin-order.api';
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
