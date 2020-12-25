import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Card, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

import Layout from '../../components/layout/layout.component';
import Chip from '../../components/chip/chip.component';
import Spinner from '../../components/spinner/spinner.component';
import Message from '../../components/message/message.component';

import { fetchAdminUsers } from '../../redux/admin-user-list/admin-user-list.actions';
import {
	selectAdminUsersLoading,
	selectAdminUsersError,
	selectAdminUsers,
} from '../../redux/admin-user-list/admin-user-list.selectors';

const AdminUsers = ({ fetchAdminUsers, loading, error, users }) => {
	useEffect(() => {
		fetchAdminUsers();
	}, [fetchAdminUsers]);

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
									<th className='text-center'>DELETE</th>
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
												<Chip variant='success'>Subscriber</Chip>
											)}
										</td>
										<td className='text-center'>
											<button type='button' className='btn btn-danger btn-sm'>
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
	loading: selectAdminUsersLoading,
	error: selectAdminUsersError,
	users: selectAdminUsers,
});

const mapDispatchToProps = (dispatch) => ({
	fetchAdminUsers: () => dispatch(fetchAdminUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);
