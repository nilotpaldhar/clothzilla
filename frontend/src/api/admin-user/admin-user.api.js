import { get } from '../config.api';
import configHeader from '../utils/configHeader';

const adminUserApi = {
	getUsers: (token) => get(`/admin/users`, configHeader(token)),
};

export default adminUserApi;
