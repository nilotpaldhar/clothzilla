import { get, put } from '../config.api';
import configHeader from '../utils/configHeader';

const adminProductApi = {
	getProducts: (token) => get(`/admin/products`, configHeader(token)),
	getProductById: (token, id) =>
		get(`/admin/products/${id}`, configHeader(token)),
	updateProduct: (token, id, product = {}) =>
		put(`/admin/products/${id}`, product, configHeader(token)),
};

export default adminProductApi;
