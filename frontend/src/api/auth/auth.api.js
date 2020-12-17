import { get, post } from '../config.api';

const configHeader = (token) => ({
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

const authApi = {
	login: (credentials = {}) => post('/auth/login', credentials),
	register: (userInfo) => post('/auth/register', userInfo),
	logout: (token) => post('/auth/logout', {}, configHeader(token)),
	me: (token) => get('/auth/me', configHeader(token)),
};

export default authApi;
