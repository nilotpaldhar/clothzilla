import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import Layout from '../../components/layout/layout.component';
import Chip from '../../components/chip/chip.component';

const AdminUsers = () => {
	return (
		<Layout>
			<Card>
				<Card.Header as='h1'>List of Users</Card.Header>
				<Card.Body>
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
							<tr>
								<td>March 14, 2020</td>
								<td>Bob Smith</td>
								<td>bob@example.com</td>
								<td className='text-center'>
									<Chip variant='success'>Subscriber</Chip>
								</td>
								<td className='text-center'>
									<button type='button' className='btn btn-danger btn-sm'>
										<FontAwesomeIcon icon={faTrash} />
									</button>
								</td>
							</tr>
							<tr>
								<td>March 14, 2020</td>
								<td>Carl Johnson</td>
								<td>carl@example.com</td>
								<td className='text-center'>
									<Chip variant='success'>Subscriber</Chip>
								</td>
								<td className='text-center'>
									<button type='button' className='btn btn-danger btn-sm'>
										<FontAwesomeIcon icon={faTrash} />
									</button>
								</td>
							</tr>
							<tr>
								<td>March 14, 2020</td>
								<td>John Doe</td>
								<td>john@example.com</td>
								<td className='text-center'>
									<Chip variant='info'>Admin</Chip>
								</td>
								<td className='text-center'>
									<button type='button' className='btn btn-danger btn-sm'>
										<FontAwesomeIcon icon={faTrash} />
									</button>
								</td>
							</tr>
						</tbody>
					</Table>
				</Card.Body>
			</Card>
		</Layout>
	);
};

export default AdminUsers;
