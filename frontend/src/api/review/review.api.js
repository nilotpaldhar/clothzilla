import { get, post } from '../config.api';
import configHeader from '../utils/configHeader';

const reviewApi = {
	getReviews: (productId) => get(`/products/${productId}/reviews`),
	createReview: (productId, review, token) =>
		post(`/products/${productId}/reviews`, review, configHeader(token)),
};

export default reviewApi;
