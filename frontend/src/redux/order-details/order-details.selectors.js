import { createSelector } from 'reselect';

const selectOrderDetails = (state) => state.orderDetails;

// Select is order details loading
export const selectOrderLoading = createSelector(
	[selectOrderDetails],
	(orderDetails) => orderDetails.loading
);

// Select order
export const selectOrder = createSelector(
	[selectOrderDetails],
	(orderDetails) => orderDetails.order
);

// Select order details error
export const selectOrderError = createSelector(
	[selectOrderDetails],
	(orderDetails) => orderDetails.error
);
