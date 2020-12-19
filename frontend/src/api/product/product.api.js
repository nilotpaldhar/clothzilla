import { get } from '../config.api';

const productApi = {
	getProducts: (page = 1, category) =>
		get(`/products?page=${page}&category=${category}`),

	getProductById: (slug = '', id = '') => get(`/products/${slug}/${id}`),
	getRelatedProduct: (slug = '', id = '') =>
		get(`/products/${slug}/${id}/related`),
};

export default productApi;
