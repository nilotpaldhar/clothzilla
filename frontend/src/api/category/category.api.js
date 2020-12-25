import { get, post, put, destroy } from '../config.api';
import configHeader from '../utils/configHeader';

const categoryApi = {
	getCategories: () => get(`/categories`),
	createCategory: (token, category = {}) =>
		post(`/admin/categories`, category, configHeader(token)),
	updateCategory: (token, id, category = {}) =>
		put(`/admin/categories/${id}`, category, configHeader(token)),
	deleteCategory: (token, id) =>
		destroy(`/admin/categories/${id}`, configHeader(token)),
};

export default categoryApi;
