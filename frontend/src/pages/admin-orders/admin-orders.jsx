import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faInfo, faTrash } from '@fortawesome/free-solid-svg-icons';

import Layout from '../../components/layout/layout.component';
import Chip from '../../components/chip/chip.component';

const AdminOrders = () => {
	return (
		<Layout>
			<Card>
				<Card.Header as='h1'>List of Orders</Card.Header>
				<Card.Body>
					<Table responsive hover>
						<thead>
							<tr>
								<th>ORDER DATE</th>
								<th>USER</th>
								<th>TOTAL</th>
								<th className='text-center'>PAYMENT</th>
								<th className='text-center'>STATUS</th>
								<th className='text-center'>DETAILS</th>
								<th className='text-center'>CANCEL</th>
								<th className='text-center'>DELETE</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>March 14, 2020</td>
								<td>Bob Smith</td>
								<td>$550.00</td>
								<td className='text-center'>
									<Chip variant='success'>March 14, 2020</Chip>
								</td>
								<td className='text-center'>
									<Chip variant='warning'>Processing</Chip>
								</td>
								<td className='text-center'>
									<Link to='/order/1' className='btn btn-light btn-sm'>
										<FontAwesomeIcon icon={faInfo} />
									</Link>
								</td>
								<td className='text-center'>
									<button type='button' className='close-btn'>
										<FontAwesomeIcon icon={faTimes} />
									</button>
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
								<td>$750.00</td>
								<td className='text-center'>
									<Chip variant='danger'>Not Paid</Chip>
								</td>
								<td className='text-center'>---</td>
								<td className='text-center'>
									<Link to='/order/1' className='btn btn-light btn-sm'>
										<FontAwesomeIcon icon={faInfo} />
									</Link>
								</td>
								<td className='text-center'>
									<button type='button' className='close-btn'>
										<FontAwesomeIcon icon={faTimes} />
									</button>
								</td>
								<td className='text-center'>
									<button type='button' className='btn btn-danger btn-sm'>
										<FontAwesomeIcon icon={faTrash} />
									</button>
								</td>
							</tr>
							<tr>
								<td>March 14, 2020</td>
								<td>Sam</td>
								<td>$400.00</td>
								<td className='text-center'>
									<Chip variant='danger'>Not Paid</Chip>
								</td>
								<td className='text-center'>
									<Chip variant='danger'>Cancelled</Chip>
								</td>
								<td className='text-center'>
									<Link to='/order/1' className='btn btn-light btn-sm'>
										<FontAwesomeIcon icon={faInfo} />
									</Link>
								</td>
								<td className='text-center'>
									<button type='button' className='close-btn' disabled>
										<FontAwesomeIcon icon={faTimes} />
									</button>
								</td>
								<td className='text-center'>
									<button type='button' className='btn btn-danger btn-sm'>
										<FontAwesomeIcon icon={faTrash} />
									</button>
								</td>
							</tr>
							<tr>
								<td>March 14, 2020</td>
								<td>Bob Smith</td>
								<td>$550.00</td>
								<td className='text-center'>
									<Chip variant='success'>March 14, 2020</Chip>
								</td>
								<td className='text-center'>
									<Chip variant='warning'>Processing</Chip>
								</td>
								<td className='text-center'>
									<Link to='/order/1' className='btn btn-light btn-sm'>
										<FontAwesomeIcon icon={faInfo} />
									</Link>
								</td>
								<td className='text-center'>
									<button type='button' className='close-btn'>
										<FontAwesomeIcon icon={faTimes} />
									</button>
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
								<td>$750.00</td>
								<td className='text-center'>
									<Chip variant='danger'>Not Paid</Chip>
								</td>
								<td className='text-center'>---</td>
								<td className='text-center'>
									<Link to='/order/1' className='btn btn-light btn-sm'>
										<FontAwesomeIcon icon={faInfo} />
									</Link>
								</td>
								<td className='text-center'>
									<button type='button' className='close-btn'>
										<FontAwesomeIcon icon={faTimes} />
									</button>
								</td>
								<td className='text-center'>
									<button type='button' className='btn btn-danger btn-sm'>
										<FontAwesomeIcon icon={faTrash} />
									</button>
								</td>
							</tr>
							<tr>
								<td>March 14, 2020</td>
								<td>Sam</td>
								<td>$400.00</td>
								<td className='text-center'>
									<Chip variant='danger'>Not Paid</Chip>
								</td>
								<td className='text-center'>
									<Chip variant='danger'>Cancelled</Chip>
								</td>
								<td className='text-center'>
									<Link to='/order/1' className='btn btn-light btn-sm'>
										<FontAwesomeIcon icon={faInfo} />
									</Link>
								</td>
								<td className='text-center'>
									<button type='button' className='close-btn' disabled>
										<FontAwesomeIcon icon={faTimes} />
									</button>
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

export default AdminOrders;
