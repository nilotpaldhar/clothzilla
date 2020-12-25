import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Card, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Reoverlay } from 'reoverlay';

import Layout from '../../components/layout/layout.component';
import Chip from '../../components/chip/chip.component';
import Spinner from '../../components/spinner/spinner.component';
import Message from '../../components/message/message.component';
import ConfirmModal from '../../components/confirm-modal/confirm-modal.component';

import { fetchAdminProducts } from '../../redux/admin-product-list/admin-product-list.actions';
import {
	selectAdminProductsLoading,
	selectAdminProductsError,
	selectAdminProducts,
} from '../../redux/admin-product-list/admin-product-list.selectors';

const AdminProducts = ({ fetchAdminProducts, loading, error, products }) => {
	const handleDelete = (id) => {
		Reoverlay.showModal(ConfirmModal, {
			text: 'Are you sure you want to delete this product?',
			onConfirm: () => {
				console.log(`Deleted ${id} `);
				Reoverlay.hideModal();
			},
		});
	};

	useEffect(() => {
		fetchAdminProducts();
	}, [fetchAdminProducts]);

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
					{loading ? (
						<Spinner />
					) : error ? (
						<Message variant='danger'>{error}</Message>
					) : (
						<Table responsive hover>
							<thead>
								<tr>
									<th>NAME</th>
									<th className='text-center'>PRICE</th>
									<th className='text-center'>DISCOUNT</th>
									<th className='text-center'>RATING</th>
									<th className='text-center'>CATEGORY</th>
									<th className='text-center'>STATUS</th>
									<th className='text-center'>EDIT</th>
									<th className='text-center'>DELETE</th>
								</tr>
							</thead>
							<tbody>
								{products.map((product) => (
									<tr key={product._id}>
										<td className='text-capitalize'>{product.name}</td>
										<td className='text-center'>${product.salePrice}</td>
										<td className='text-center'>
											<Chip variant='info'>{product.discount}%</Chip>
										</td>
										<td className='text-center'>
											<Chip variant='warning'>{product.rating}</Chip>
										</td>
										<td className='text-uppercase text-center'>
											{product.category.name}
										</td>
										<td className='text-center'>
											{product.isPublished ? (
												<Chip variant='success'>Published</Chip>
											) : (
												<Chip variant='dark'>Not Published</Chip>
											)}
										</td>
										<td className='text-center'>
											<Link
												to={`/admin/products/${product._id}/edit`}
												className='btn btn-light btn-sm'>
												<FontAwesomeIcon icon={faPen} />
											</Link>
										</td>
										<td className='text-center'>
											<button
												type='button'
												className='btn btn-danger btn-sm'
												onClick={() => handleDelete(product._id)}>
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
	loading: selectAdminProductsLoading,
	error: selectAdminProductsError,
	products: selectAdminProducts,
});

const mapDispatchToProps = (dispatch) => ({
	fetchAdminProducts: () => dispatch(fetchAdminProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);
