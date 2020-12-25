import { get } from '../config.api';
import configHeader from '../utils/configHeader';

const adminOrderApi = {
	getOders: (token) => get(`/admin/orders`, configHeader(token)),
	getOderById: (token, id) => get(`/admin/orders/${id}`, configHeader(token)),
};

export default adminOrderApi;
