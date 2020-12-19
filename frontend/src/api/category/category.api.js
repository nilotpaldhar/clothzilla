import { get } from '../config.api';

const categoryApi = {
	getCategories: () => get(`/categories`),
};

export default categoryApi;
