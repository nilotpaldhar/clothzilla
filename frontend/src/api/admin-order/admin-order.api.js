import { get, destroy, post } from '../config.api';
import configHeader from '../utils/configHeader';

const adminOrderApi = {
	getOders: (token) => get(`/admin/orders`, configHeader(token)),
	getOderById: (token, id) => get(`/admin/orders/${id}`, configHeader(token)),
	deliver: (token, id) =>
		post(`/admin/orders/${id}/deliver`, {}, configHeader(token)),
	deleteOrder: (token, id) =>
		destroy(`/admin/orders/${id}`, configHeader(token)),
};

export default adminOrderApi;
