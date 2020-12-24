import { get } from '../config.api';

const productApi = {
	getProducts: (page = 1, category) =>
		get(`/products?page=${page}&category=${category}`),
	getProductById: (slug = '', id = '') => get(`/products/${slug}/${id}`),
	getRelatedProduct: (slug = '', id = '') =>
		get(`/products/${slug}/${id}/related?limit=3`),
	search: (query) => get(`/products/search?query=${query}`),
};

export default productApi;
