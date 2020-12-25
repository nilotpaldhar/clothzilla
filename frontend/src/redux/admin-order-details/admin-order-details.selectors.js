import { createSelector } from 'reselect';

const selectAdminOrderDetails = (state) => state.adminOrderDetails;

// Select is admin order details loading
export const selectOrderDetailsLoading = createSelector(
	[selectAdminOrderDetails],
	(adminOrderDetails) => adminOrderDetails.loading
);

// Select admin order details
export const selectOrderDetails = createSelector(
	[selectAdminOrderDetails],
	(adminOrderDetails) => adminOrderDetails.order
);

// Select admin order details error
export const selectOrderDetailsError = createSelector(
	[selectAdminOrderDetails],
	(adminOrderDetails) => adminOrderDetails.error
);
