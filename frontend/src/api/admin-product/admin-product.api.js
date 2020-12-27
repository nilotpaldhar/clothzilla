import { get, post, put, destroy } from '../config.api';
import configHeader from '../utils/configHeader';

const adminProductApi = {
	getProducts: (token) => get(`/admin/products`, configHeader(token)),
	getProductById: (token, id) =>
		get(`/admin/products/${id}`, configHeader(token)),
	createProduct: (token) => post(`/admin/products`, {}, configHeader(token)),
	updateProduct: (token, id, product = {}) =>
		put(`/admin/products/${id}`, product, configHeader(token)),

	uploadImage: (token, id, image) =>
		post(`/admin/products/${id}/image`, image, configHeader(token)),

	deleteProduct: (token, id) =>
		destroy(`/admin/products/${id}`, configHeader(token)),
};

export default adminProductApi;
