import { get, post } from '../config.api';
import configHeader from '../utils/configHeader';

const adminUserApi = {
	getUsers: (token) => get(`/admin/users`, configHeader(token)),
	activateUser: (token, id) =>
		post(`/admin/users/${id}/activate`, {}, configHeader(token)),
	deactivateUser: (token, id) =>
		post(`/admin/users/${id}/deactivate`, {}, configHeader(token)),
	makeAdmin: (token, id) =>
		post(`/admin/users/${id}/admin`, {}, configHeader(token)),
	makeSubscriber: (token, id) =>
		post(`/admin/users/${id}/subscriber`, {}, configHeader(token)),
};

export default adminUserApi;
