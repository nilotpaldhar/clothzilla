import { createSelector } from 'reselect';

const selectPayment = (state) => state.payment;

// Select payment loading state
export const selectPaymentLoading = createSelector(
	[selectPayment],
	(payment) => payment.loading
);

// Select payment success
export const selectPaymentSuccess = createSelector(
	[selectPayment],
	(payment) => payment.success
);

// Select payment error
export const selectPaymentError = createSelector(
	[selectPayment],
	(payment) => payment.error
);
