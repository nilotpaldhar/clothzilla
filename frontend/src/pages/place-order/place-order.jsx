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
import {
	createOrder,
	resetCreateOrder,
} from '../../redux/order-create/order-create.actions';
import {
	selectOrderCreateLoading,
	selectOrderCreateError,
	selectOrderCreateSuccess,
	selectOrder,
} from '../../redux/order-create/order-create.selectors';

const PlaceOrder = ({
	history,
	createOrder,
	resetCreateOrder,
	finishedAllSteps,
	cartItems,
	shippingAddress,
	paymentMethod,
	cartTotal,
	totalTax,
	shippingPrice,
	totalPrice,
	loading,
	orderError,
	orderSuccess,
	newOrder,
}) => {
	const [error, setError] = useState('');

	useEffect(() => {
		if (!finishedAllSteps) {
			setError('Please complete all the steps before placing an order');
			return;
		}
		if (orderSuccess) {
			history.push(`/order/${newOrder._id}`);
		}

		return () => {
			resetCreateOrder();
		};
	}, [finishedAllSteps, orderSuccess, resetCreateOrder, newOrder, history]);

	const handlePlaceOrder = () => {
		const newOrder = {
			orderItems: cartItems,
			itemsPrice: cartTotal,
			shippingAddress,
			paymentMethod,
			shippingPrice,
			totalPrice,
			taxPrice: totalTax,
		};
		createOrder(newOrder);
	};

	return (
		<Layout>
			<Card>
				<Card.Header>
					<CheckoutSteps step1 step2 step3 step4 />
				</Card.Header>
				<Card.Body>
					{orderError && <Message variant='danger'>{orderError}</Message>}
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
									onClick={handlePlaceOrder}
									disabled={loading}>
									{loading ? 'Placing Order...' : 'Place Order'}
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
	loading: selectOrderCreateLoading,
	orderError: selectOrderCreateError,
	orderSuccess: selectOrderCreateSuccess,
	newOrder: selectOrder,
});

const mapDispatchToProps = (dispatch) => ({
	createOrder: (order) => dispatch(createOrder(order)),
	resetCreateOrder: () => dispatch(resetCreateOrder()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder);
