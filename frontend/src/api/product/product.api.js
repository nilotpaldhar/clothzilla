import { get } from '../config.api';

const productApi = {
	getProducts: (page = 1) => get(`/products?page=${page}`),
	getProductById: (slug = '', id = '') => get(`/products/${slug}/${id}`),
};

export default productApi;
