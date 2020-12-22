import { get, post } from '../config.api';
import configHeader from '../utils/configHeader';

const orderApi = {
	getAllOrders: (token) => get('/myorders', configHeader(token)),
	getOrderById: (token, id = '') => get(`/myorders/${id}`, configHeader(token)),
	createOrder: (token, order = {}) =>
		post('/myorders', order, configHeader(token)),
};

export default orderApi;
