import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faTrash } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { Reoverlay } from 'reoverlay';

import Layout from '../../components/layout/layout.component';
import Chip from '../../components/chip/chip.component';
import Spinner from '../../components/spinner/spinner.component';
import Message from '../../components/message/message.component';
import ConfirmModal from '../../components/confirm-modal/confirm-modal.component';

import {
	fetchAdminOrders,
	deleteOrder,
} from '../../redux/admin-order-list/admin-order-list.actions';
import {
	selectAdminOrdersLoading,
	selectAdminOrdersError,
	selectAdminOrders,
} from '../../redux/admin-order-list/admin-order-list.selectors';

const AdminOrders = ({
	fetchAdminOrders,
	deleteOrder,
	loading,
	error,
	orders,
}) => {
	const handleDelete = (id) => {
		Reoverlay.showModal(ConfirmModal, {
			text: 'Are you sure you want to delete this order?',
			onConfirm: async () => {
				await deleteOrder(id);
				Reoverlay.hideModal();
			},
		});
	};

	useEffect(() => {
		fetchAdminOrders();
	}, [fetchAdminOrders]);

	return (
		<Layout>
			<Card>
				<Card.Header as='h1'>List of Orders</Card.Header>
				<Card.Body>
					{loading ? (
						<Spinner />
					) : error ? (
						<Message variant='danger'>{error}</Message>
					) : (
						<Table responsive hover>
							<thead>
								<tr>
									<th>ORDER DATE</th>
									<th>USER</th>
									<th>TOTAL</th>
									<th className='text-center'>PAYMENT</th>
									<th className='text-center'>STATUS</th>
									<th className='text-center'>DETAILS</th>
									<th className='text-center'>DELETE</th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order) => (
									<tr key={order._id}>
										<td>
											{order.createdAt &&
												format(new Date(order.createdAt), 'MMM dd, yyyy')}
										</td>
										<td>{order.user.name}</td>
										<td>${order.totalPrice}</td>
										<td className='text-center'>
											{order.isPaid ? (
												<Chip variant='success'>
													{order.paidAt &&
														format(new Date(order.paidAt), 'MMM dd, yyyy')}
												</Chip>
											) : (
												<Chip variant='danger'>Not Paid</Chip>
											)}
										</td>
										<td className='text-center'>
											{order.status ? (
												<Chip
													variant={
														order.status === 'processing'
															? 'warning'
															: order.status === 'canceled'
															? 'danger'
															: 'success'
													}>
													{order.status}
												</Chip>
											) : (
												'---'
											)}
										</td>
										<td className='text-center'>
											<Link
												to={`/admin/orders/${order._id}`}
												className='btn btn-light btn-sm'>
												<FontAwesomeIcon icon={faInfo} />
											</Link>
										</td>
										<td className='text-center'>
											<button
												type='button'
												className='btn btn-danger btn-sm'
												onClick={() => handleDelete(order._id)}>
												<FontAwesomeIcon icon={faTrash} />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					)}
				</Card.Body>
			</Card>
		</Layout>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: selectAdminOrdersLoading,
	error: selectAdminOrdersError,
	orders: selectAdminOrders,
});

const mapDispatchToProps = (dispatch) => ({
	fetchAdminOrders: () => dispatch(fetchAdminOrders()),
	deleteOrder: (id) => dispatch(deleteOrder(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrders);
