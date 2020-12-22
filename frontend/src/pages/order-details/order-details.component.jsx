import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Card, Row, Col, Button } from 'react-bootstrap';

import Layout from '../../components/layout/layout.component';
import OrderSummary from '../../components/order-summary/order-summary.component';
import OrderPriceSummary from '../../components/order-price-summary/order-price-summary.component';
import Spinner from '../../components/spinner/spinner.component';
import Message from '../../components/message/message.component';
import PaypalButton from '../../components/paypal-button/paypal-button.component';
import StripeButton from '../../components/stripe-button/stripe-button.component';

import { fetchOrderDetails } from '../../redux/order-details/order-details.actions';
import {
	selectOrderLoading,
	selectOrderError,
	selectOrder,
} from '../../redux/order-details/order-details.selectors';

const OrderDetails = ({ match, fetchOrderDetails, loading, error, order }) => {
	const orderId = match.params.id;

	useEffect(() => {
		fetchOrderDetails(orderId);
	}, [fetchOrderDetails, orderId]);

	return (
		<Layout>
			<Card>
				<Card.Header as='h1'>Order Details</Card.Header>
				<Card.Body>
					{loading ? (
						<Spinner />
					) : error ? (
						<Message variant='danger'>{error}</Message>
					) : (
						<Row>
							<Col xs={12} lg={8} className='mb-3'>
								<OrderSummary
									showStatus
									items={order.orderItems}
									paymentMethod={order.paymentMethod}
									paymentDetails={{
										isPaid: order.isPaid,
										paidAt: order.paidAt,
									}}
									status={order.status}
									deliveryDetails={{
										isDelivered: order.isDelivered,
										deliveredAt: order.deliveredAt,
									}}
									shippingAddress={order.shippingAddress}
								/>
							</Col>
							<Col xs={12} lg={4}>
								<OrderPriceSummary
									title='Order Summary'
									itemsPrice={order.itemsPrice}
									shippingPrice={order.shippingPrice}
									taxPrice={order.taxPrice}
									totalPrice={order.totalPrice}
								/>
								{!order.isPaid && (
									<>
										{order.paymentMethod &&
										order.paymentMethod.toLowerCase() === 'paypal' ? (
											<PaypalButton />
										) : (
											<StripeButton />
										)}
									</>
								)}
							</Col>
						</Row>
					)}
				</Card.Body>
			</Card>
		</Layout>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: selectOrderLoading,
	error: selectOrderError,
	order: selectOrder,
});

const mapDispatchToProps = (dispatch) => ({
	fetchOrderDetails: (id) => dispatch(fetchOrderDetails(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
