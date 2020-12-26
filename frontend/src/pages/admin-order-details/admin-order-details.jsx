import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Card, Row, Col, Button } from 'react-bootstrap';

import Layout from '../../components/layout/layout.component';
import OrderSummary from '../../components/order-summary/order-summary.component';
import OrderPriceSummary from '../../components/order-price-summary/order-price-summary.component';
import Spinner from '../../components/spinner/spinner.component';
import Message from '../../components/message/message.component';

import {
	fetchAdminOrderDetails,
	deliverOrder,
} from '../../redux/admin-order-details/admin-order-details.actions';
import {
	selectOrderDetailsLoading,
	selectOrderDetailsError,
	selectOrderDetails,
} from '../../redux/admin-order-details/admin-order-details.selectors';

const AdminOrderDetails = ({
	match,
	fetchOrderDetails,
	deliverOrder,
	loading,
	error,
	order,
}) => {
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
								{order.isPaid && !order.isDelivered && (
									<Button
										size='lg'
										className='rounded btn-block mt-2'
										onClick={() => deliverOrder(order._id)}>
										Mark as Delivered
									</Button>
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
	loading: selectOrderDetailsLoading,
	error: selectOrderDetailsError,
	order: selectOrderDetails,
});

const mapDispatchToProps = (dispatch) => ({
	fetchOrderDetails: (id) => dispatch(fetchAdminOrderDetails(id)),
	deliverOrder: (id) => dispatch(deliverOrder(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrderDetails);
