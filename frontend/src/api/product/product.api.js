import { get } from '../config.api';

const productApi = {
	getProducts: (page = 1) => get(`/products?page=${page}`),
};

export default productApi;
