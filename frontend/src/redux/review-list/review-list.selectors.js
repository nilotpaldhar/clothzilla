import { createSelector } from 'reselect';

const selectReviewList = (state) => state.reviewList;

// Select is reviews loading
export const selectLoading = createSelector(
	[selectReviewList],
	(reviewList) => reviewList.loading
);

// Select reviews
export const selectReviews = createSelector(
	[selectReviewList],
	(reviewList) => reviewList.reviews
);

// Select reviews error
export const selectError = createSelector(
	[selectReviewList],
	(reviewList) => reviewList.error
);
