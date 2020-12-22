import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faInfo } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

import Chip from '../chip/chip.component';
import Message from '../message/message.component';
import Spinner from '../spinner/spinner.component';

import { fetchOrders } from '../../redux/order-list/order-list.actions';
import {
	selectOrdersLoading,
	selectOrderError,
	selectOrders,
} from '../../redux/order-list/order-list.selectors';

const UserOrders = ({ fetchOrders, loading, error, orders }) => {
	useEffect(() => {
		fetchOrders();
	}, [fetchOrders]);

	return (
		<Card>
			<Card.Header as='h1'>Your Orders</Card.Header>
			<Card.Body>
				{loading ? (
					<Spinner />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : orders.length === 0 ? (
					<h1 className='text-center py-5 h3'>There is no orders to show</h1>
				) : (
					<Table responsive hover>
						<thead>
							<tr>
								<th>DATE</th>
								<th>TOTAL</th>
								<th className='text-center'>PAYMENT</th>
								<th className='text-center'>STATUS</th>
								<th className='text-center'>DETAILS</th>
								<th className='text-center'>CANCEL</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									<td>
										{order.createdAt &&
											format(new Date(order.createdAt), 'MMM dd, yyyy')}
									</td>
									<td>${order.totalPrice}</td>
									<td className='text-center'>
										{order.isPaid ? (
											<Chip variant='success'>Paid at {order.paidAt}</Chip>
										) : (
											<Chip variant='danger'>Not Paid</Chip>
										)}
									</td>
									<td className='text-center'>
										{order.status ? (
											<Chip
												variant={
													order.status.toLowerCase() === 'delivered'
														? 'success'
														: order.status.toLowerCase() === 'canceled'
														? 'danger'
														: 'warning'
												}>
												{order.status}
											</Chip>
										) : (
											'---'
										)}
									</td>
									<td className='text-center'>
										<Link
											to={`/order/${order._id}`}
											className='btn btn-light btn-sm'>
											<FontAwesomeIcon icon={faInfo} />
										</Link>
									</td>
									<td className='text-center'>
										<button
											type='button'
											className='close-btn'
											disabled={order.isCanceled}>
											<FontAwesomeIcon icon={faTimes} />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Card.Body>
		</Card>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: selectOrdersLoading,
	error: selectOrderError,
	orders: selectOrders,
});

const mapDispatchToProps = (dispatch) => ({
	fetchOrders: () => dispatch(fetchOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);
