import { createSelector } from 'reselect';

const selectOrderList = (state) => state.orderList;

// Select is orders loading
export const selectOrdersLoading = createSelector(
	[selectOrderList],
	(orderList) => orderList.loadingOrders
);

// Select orders
export const selectOrders = createSelector(
	[selectOrderList],
	(orderList) => orderList.orders
);

// Select orders error
export const selectOrderError = createSelector(
	[selectOrderList],
	(orderList) => orderList.ordersError
);
