import { get } from '../config.api';
import configHeader from '../utils/configHeader';

const adminProductApi = {
	getProducts: (token) => get(`/admin/products`, configHeader(token)),
};

export default adminProductApi;
