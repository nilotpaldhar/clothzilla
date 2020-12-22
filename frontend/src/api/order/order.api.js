import { get } from '../config.api';
import configHeader from '../utils/configHeader';

const orderApi = {
	getAllOrders: (token) => get('/myorders', configHeader(token)),
};

export default orderApi;
