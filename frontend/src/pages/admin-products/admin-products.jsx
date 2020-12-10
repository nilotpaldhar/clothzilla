import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';

import Layout from '../../components/layout/layout.component';
import Chip from '../../components/chip/chip.component';

import products from '../../sample-data/products';

const AdminProducts = () => {
	return (
		<Layout>
			<Card>
				<Card.Header as='h1' className='d-flex justify-content-between'>
					<span>List of Products</span>
					<Button variant='dark' className='rounded'>
						<FontAwesomeIcon icon={faPlus} />
						<span className='ml-2'>New Product</span>
					</Button>
				</Card.Header>
				<Card.Body>
					<Table responsive hover>
						<thead>
							<tr>
								<th>NAME</th>
								<th className='text-center'>PRICE</th>
								<th className='text-center'>DISCOUNT</th>
								<th className='text-center'>RATING</th>
								<th>CATEGORY</th>
								<th className='text-center'>STATUS</th>
								<th className='text-center'>EDIT</th>
								<th className='text-center'>DELETE</th>
							</tr>
						</thead>
						<tbody>
							{products
								.filter((products, idx) => idx > 6)
								.map((product, idx) => (
									<tr key={product.id}>
										<td>
											<Link
												to={`/product/${product.id}`}
												className='text-capitalize'>
												{product.name}
											</Link>
										</td>
										<td className='text-center'>${product.salePrice}</td>
										<td className='text-center'>
											<Chip variant='info'>{product.discount}%</Chip>
										</td>
										<td className='text-center'>
											<Chip variant='warning'>{product.rating}</Chip>
										</td>
										<td>Men & Women</td>
										<td className='text-center'>
											{(idx + 1) % 3 === 0 ? (
												<Chip variant='dark'>Inactive</Chip>
											) : (
												<Chip variant='success'>Active</Chip>
											)}
										</td>
										<td className='text-center'>
											<Link to='#' className='btn btn-light btn-sm'>
												<FontAwesomeIcon icon={faPen} />
											</Link>
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
				</Card.Body>
			</Card>
		</Layout>
	);
};

export default AdminProducts;
