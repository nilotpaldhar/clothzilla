import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { PayPalButton } from 'react-paypal-button-v2';
import { ProgressBar } from 'react-bootstrap';

import { paymentAsync } from '../../redux/payment/payment.actions';
import { selectPaymentLoading } from '../../redux/payment/payment.selectors';

const PaypalButton = ({ amount, method, orderId, paymentAsync, loading }) => {
	const successHandler = (paymentResult) => {
		paymentAsync(method, orderId, paymentResult);
	};

	return (
		<>
			<PayPalButton
				amount={amount}
				onSuccess={successHandler}
				options={{
					clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
				}}
			/>
			{loading && (
				<ProgressBar
					striped
					animated
					variant='success'
					now={100}
					label='Processing'
					style={{ height: '2rem' }}
				/>
			)}
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: selectPaymentLoading,
});

const mapDispatchToProps = (dispatch) => ({
	paymentAsync: (method, orderId, paymentDetails) =>
		dispatch(paymentAsync(method, orderId, paymentDetails)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaypalButton);
