import { get, post, put } from '../config.api';
import configHeader from '../utils/configHeader';

const profileApi = {
	getAvatar: (token) => get('/profile/avatar', configHeader(token)),
	getUserAddress: (token) => get('/profile/shipping', configHeader(token)),
	updateUserAddress: (token, address = {}) =>
		put('/profile/shipping', address, configHeader(token)),
	getUserProfile: (token) => get('/profile', configHeader(token)),
	updateUserProfile: (token, details = {}) =>
		put('/profile', details, configHeader(token)),
};

export default profileApi;
