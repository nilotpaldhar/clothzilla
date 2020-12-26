import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Card, Table } from 'react-bootstrap';
import { format } from 'date-fns';
import { Reoverlay } from 'reoverlay';

import Layout from '../../components/layout/layout.component';
import Chip from '../../components/chip/chip.component';
import Spinner from '../../components/spinner/spinner.component';
import Message from '../../components/message/message.component';
import ConfirmModal from '../../components/confirm-modal/confirm-modal.component';

import {
	fetchAdminUsers,
	activateUserAccount,
	deactivateUserAccount,
	makeUserAdmin,
	makeUserSubscriber,
} from '../../redux/admin-user-list/admin-user-list.actions';
import {
	selectAdminUsersLoading,
	selectAdminUsersError,
	selectAdminUsers,
} from '../../redux/admin-user-list/admin-user-list.selectors';

const AdminUsers = ({
	fetchAdminUsers,
	activateUser,
	deactivateUser,
	makeAdmin,
	makeSubscriber,
	loading,
	error,
	users,
}) => {
	useEffect(() => {
		fetchAdminUsers();
	}, [fetchAdminUsers]);

	// Change user role
	const changeUserRole = (user) => {
		const text = `Are you sure you want to make him ${
			user.isAdmin ? 'SUBSCRIBER' : 'ADMIN'
		}`;

		Reoverlay.showModal(ConfirmModal, {
			text,
			onConfirm: async () => {
				if (user.isAdmin) {
					await makeSubscriber(user._id);
				} else {
					await makeAdmin(user._id);
				}
				Reoverlay.hideModal();
			},
		});
	};

	// Change user status
	const changeUserStatus = (user) => {
		const text = `Are you sure you want to ${
			user.isActive ? 'deactivate' : 'activate'
		} this user`;

		Reoverlay.showModal(ConfirmModal, {
			text,
			onConfirm: async () => {
				if (user.isActive) {
					await deactivateUser(user._id);
				} else {
					await activateUser(user._id);
				}
				Reoverlay.hideModal();
			},
		});
	};

	return (
		<Layout>
			<Card>
				<Card.Header as='h1'>List of Users</Card.Header>
				<Card.Body>
					{loading ? (
						<Spinner />
					) : error ? (
						<Message variant='danger'>{error}</Message>
					) : (
						<Table responsive hover>
							<thead>
								<tr>
									<th>JOINING DATE</th>
									<th>NAME</th>
									<th>EMAIL</th>
									<th className='text-center'>ROLE</th>
									<th className='text-center'>ADMIN</th>
									<th className='text-center'>STATUS</th>
									<th className='text-center'>ACTIVE</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user) => (
									<tr key={user._id}>
										<td>
											{user.createdAt &&
												format(new Date(user.createdAt), 'MMM dd, yyyy')}
										</td>
										<td>{user.name}</td>
										<td>{user.email}</td>
										<td className='text-center'>
											{user.isAdmin ? (
												<Chip variant='info'>Admin</Chip>
											) : (
												<Chip variant='warning'>Subscriber</Chip>
											)}
										</td>
										<td className='text-center'>
											<button
												type='button'
												className='btn btn-light btn-sm'
												onClick={() => changeUserRole(user)}>
												{user.isAdmin
													? 'Switch to Subscriber'
													: 'Switch to Admin'}
											</button>
										</td>
										<td className='text-center'>
											{user.isActive ? (
												<Chip variant='dark'>Active</Chip>
											) : (
												<Chip variant='secondary'>Inactive</Chip>
											)}
										</td>
										<td className='text-center'>
											<button
												type='button'
												className='btn btn-secondary btn-sm'
												onClick={() => changeUserStatus(user)}>
												{user.isActive ? 'Deactivate' : 'Activate'}
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
	loading: selectAdminUsersLoading,
	error: selectAdminUsersError,
	users: selectAdminUsers,
});

const mapDispatchToProps = (dispatch) => ({
	fetchAdminUsers: () => dispatch(fetchAdminUsers()),
	activateUser: (id) => dispatch(activateUserAccount(id)),
	deactivateUser: (id) => dispatch(deactivateUserAccount(id)),
	makeAdmin: (id) => dispatch(makeUserAdmin(id)),
	makeSubscriber: (id) => dispatch(makeUserSubscriber(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);
