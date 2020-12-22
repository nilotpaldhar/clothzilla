import { createSelector } from 'reselect';

const selectOrderCreate = (state) => state.orderCreate;

// Select create order loading state
export const selectOrderCreateLoading = createSelector(
	[selectOrderCreate],
	(orderCreate) => orderCreate.loading
);

// Select create order success
export const selectOrderCreateSuccess = createSelector(
	[selectOrderCreate],
	(orderCreate) => orderCreate.success
);

// Select order
export const selectOrder = createSelector(
	[selectOrderCreate],
	(orderCreate) => orderCreate.order
);

// Select create order error
export const selectOrderCreateError = createSelector(
	[selectOrderCreate],
	(orderCreate) => orderCreate.error
);
