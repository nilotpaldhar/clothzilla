import Axios from 'axios';

const apiClient = Axios.create({
	baseURL: '/api',
});

const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };
