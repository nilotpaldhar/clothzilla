import { createSelector } from 'reselect';

const selectAdminOrderList = (state) => state.adminOrderList;

// Select is admin orders loading
export const selectAdminOrdersLoading = createSelector(
	[selectAdminOrderList],
	(adminOrderList) => adminOrderList.loading
);

// Select admin orders
export const selectAdminOrders = createSelector(
	[selectAdminOrderList],
	(adminOrderList) => adminOrderList.orders
);

// Select admin orders error
export const selectAdminOrdersError = createSelector(
	[selectAdminOrderList],
	(adminOrderList) => adminOrderList.error
);
