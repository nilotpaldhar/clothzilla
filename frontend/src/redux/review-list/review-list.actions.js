import {
	REVIEW_LIST_REQUEST,
	REVIEW_LIST_SUCCESS,
	REVIEW_LIST_FAIL,
	CREATE_REVIEW_SUCCESS,
} from './review-list.types';
import { productDetailsSuccess } from '../product-details/product-details.actions';
import { createNotification } from '../notification/notification.actions';
import reviewApi from '../../api/review/review.api';
import parseErrorMsg from '../../utils/parseErrorMsg';

// Fetch reviews of a particular product
export const reviewListRequest = () => ({ type: REVIEW_LIST_REQUEST });
export const reviewListSuccess = (data) => ({
	type: REVIEW_LIST_SUCCESS,
	payload: data,
});
export const reviewListFail = (error) => ({
	type: REVIEW_LIST_FAIL,
	payload: error,
});
export const fetchReviews = (productId) => async (dispatch) => {
	dispatch(reviewListRequest());

	try {
		const { data } = await reviewApi.getReviews(productId);
		dispatch(reviewListSuccess(data));
	} catch (error) {
		dispatch(reviewListFail(parseErrorMsg(error)));
	}
};

// Create new review
export const createReview = (productId, review) => (dispatch, getState) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { auth } = getState();
			const { data } = await reviewApi.createReview(
				productId,
				review,
				auth.token
			);
			dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data.review });
			dispatch(productDetailsSuccess(data.product));
			dispatch(createNotification('Your review added', 'success'));
			resolve(data);
		} catch (error) {
			dispatch(createNotification(parseErrorMsg(error), 'error'));
			reject(parseErrorMsg(error));
		}
	});
};
