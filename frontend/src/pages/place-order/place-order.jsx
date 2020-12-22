import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Card, Row, Col, Button } from 'react-bootstrap';

import Layout from '../../components/layout/layout.component';
import CheckoutSteps from '../../components/checkout-steps/checkout-steps.component';
import OrderSummary from '../../components/order-summary/order-summary.component';
import OrderPriceSummary from '../../components/order-price-summary/order-price-summary.component';
import Message from '../../components/message/message.component';

import {
	selectFinishedAllSteps,
	selectCartItems,
	selectShippingAddress,
	selectPaymentMethod,
	selectCartTotal,
	selectTotalTax,
	selectShippingPrice,
	selectTotalPrice,
} from '../../redux/cart/cart.selectors';

const PlaceOrder = ({
	history,
	finishedAllSteps,
	cartItems,
	shippingAddress,
	paymentMethod,
	cartTotal,
	totalTax,
	shippingPrice,
	totalPrice,
}) => {
	const [error, setError] = useState('');

	useEffect(() => {
		if (!finishedAllSteps) {
			setError('Please complete all the steps before placing an order');
		}
	}, [finishedAllSteps]);

	const handlePlaceOrder = () => {
		const newOrder = {
			orderItems: cartItems,
			shippingAddress,
			paymentMethod,
			shippingPrice,
			totalPrice,
			taxPrice: totalTax,
		};
		console.log(newOrder);
	};

	return (
		<Layout>
			<Card>
				<Card.Header>
					<CheckoutSteps step1 step2 step3 step4 />
				</Card.Header>
				<Card.Body>
					{error ? (
						<Message variant='danger'>{error}</Message>
					) : (
						<Row>
							<Col xs={12} lg={8} className='mb-3'>
								<OrderSummary
									items={cartItems}
									paymentMethod={paymentMethod}
									shippingAddress={shippingAddress}
								/>
							</Col>
							<Col xs={12} lg={4}>
								<OrderPriceSummary
									title='Order Summary'
									itemsPrice={cartTotal}
									shippingPrice={shippingPrice}
									taxPrice={totalTax}
									totalPrice={totalPrice}
								/>
								<Button
									type='submit'
									variant='primary'
									className='mt-2 btn-block btn-lg rounded'
									onClick={handlePlaceOrder}>
									Place Order
								</Button>
							</Col>
						</Row>
					)}
				</Card.Body>
			</Card>
		</Layout>
	);
};

const mapStateToProps = createStructuredSelector({
	finishedAllSteps: selectFinishedAllSteps,
	cartItems: selectCartItems,
	shippingAddress: selectShippingAddress,
	paymentMethod: selectPaymentMethod,
	cartTotal: selectCartTotal,
	totalTax: selectTotalTax,
	shippingPrice: selectShippingPrice,
	totalPrice: selectTotalPrice,
});

export default connect(mapStateToProps)(PlaceOrder);
