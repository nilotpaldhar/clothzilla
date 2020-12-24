import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import StripeCheckout from 'react-stripe-checkout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcStripe } from '@fortawesome/free-brands-svg-icons';
import { ProgressBar } from 'react-bootstrap';

import logo from '../../assets/logo/logo-icon.png';

import { paymentAsync } from '../../redux/payment/payment.actions';
import { selectPaymentLoading } from '../../redux/payment/payment.selectors';

const StripeButton = ({ amount, method, orderId, paymentAsync, loading }) => {
	const amountForStripe = Number(amount) * 100;
	const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

	const handleToken = async (token) => {
		paymentAsync(method, orderId, { token, amount: amountForStripe });
	};

	return (
		<>
			<StripeCheckout
				ComponentClass='div'
				name='ClothZilla Ltd.'
				description={`Your total is ${amount}`}
				panelLabel='Pay Now With Stripe'
				amount={amountForStripe}
				image={logo}
				stripeKey={publishableKey}
				token={handleToken}>
				<button
					className='btn btn-info btn-block btn-lg mb-3 rounded'
					disabled={loading}>
					<FontAwesomeIcon icon={faCcStripe} />
					<span className='ml-2'>Pay With Stripe</span>
				</button>
			</StripeCheckout>
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

export default connect(mapStateToProps, mapDispatchToProps)(StripeButton);
