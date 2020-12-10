import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faInfo } from '@fortawesome/free-solid-svg-icons';

import Chip from '../chip/chip.component';

const UserOrders = () => {
	return (
		<Card>
			<Card.Header as='h1'>Orders Details</Card.Header>
			<Card.Body>
				<Table responsive hover>
					<thead>
						<tr>
							<th>ORDER DATE</th>
							<th>TOTAL</th>
							<th className='text-center'>PAID</th>
							<th className='text-center'>DELIVERED</th>
							<th className='text-center'>DETAILS</th>
							<th className='text-center'>CANCEL</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>March 14, 2020</td>
							<td>$550.00</td>
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
						</tr>
						<tr>
							<td>March 14, 2020</td>
							<td>$150.00</td>
							<td className='text-center'>
								<Chip variant='success'>Paid</Chip>
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
						</tr>
						<tr>
							<td>March 14, 2020</td>
							<td>$470.00</td>
							<td className='text-center'>
								<Chip variant='success'>Paid</Chip>
							</td>
							<td className='text-center'>
								<Chip variant='success'>Delivered</Chip>
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
						</tr>
						<tr>
							<td>March 14, 2020</td>
							<td>$550.00</td>
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
						</tr>
						<tr>
							<td>March 14, 2020</td>
							<td>$150.00</td>
							<td className='text-center'>
								<Chip variant='success'>Paid</Chip>
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
						</tr>
						<tr>
							<td>March 14, 2020</td>
							<td>$470.00</td>
							<td className='text-center'>
								<Chip variant='success'>Paid</Chip>
							</td>
							<td className='text-center'>
								<Chip variant='success'>Delivered</Chip>
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
						</tr>
					</tbody>
				</Table>
			</Card.Body>
		</Card>
	);
};

export default UserOrders;
