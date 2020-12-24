import React from 'react';

import PaypalButton from '../paypal-button/paypal-button.component';
import StripeButton from '../stripe-button/stripe-button.component';

const PaymentHandler = ({ method = '', orderId, amount }) => {
	const paymentMethod = method && method.toLowerCase();

	return (
		<div className='my-2'>
			{paymentMethod === 'paypal' ? (
				<PaypalButton amount={amount} method={method} orderId={orderId} />
			) : paymentMethod === 'stripe' ? (
				<StripeButton amount={amount} method={method} orderId={orderId} />
			) : (
				''
			)}
		</div>
	);
};

export default PaymentHandler;
