import React from 'react';
import { Row, Col, Form, Card, Button } from 'react-bootstrap';

import Layout from '../../components/layout/layout.component';
import CategoryCollection from '../../components/category-collection/category-collection.component';
import ProductImage from '../../components/product-image/product-image.component';

import categories from '../../sample-data/categories';
import products from '../../sample-data/products';

const AdminProductsEdit = ({ match }) => {
	const product = products.find(
		(product) => product.id === Number(match.params.id)
	);

	return (
		<Layout>
			<Row>
				<Col xs={12} lg={4} className='order-2 order-lg-1'>
					<Row>
						<Col lg={12} className='mb-4'>
							<ProductImage src={product.image} />
						</Col>
						<Col lg={12}>
							<CategoryCollection />
						</Col>
					</Row>
				</Col>
				<Col xs={12} lg={8} className='order-1 order-lg-2 mb-4 mb-lg-0'>
					<Card>
						<Card.Header>Edit Product</Card.Header>
						<Card.Body>
							<Form>
								<Form.Group controlId='name'>
									<Form.Label>Name:</Form.Label>
									<Form.Control type='text' />
								</Form.Group>
								<Form.Row>
									<Col lg={6}>
										<Form.Group controlId='price'>
											<Form.Label>Price:</Form.Label>
											<Form.Control type='number' min='0' />
										</Form.Group>
									</Col>
									<Col lg={6}>
										<Form.Group controlId='price'>
											<Form.Label>Discount(%):</Form.Label>
											<Form.Control type='number' min='0' max='100' />
										</Form.Group>
									</Col>
								</Form.Row>
								<Form.Group controlId='stock'>
									<Form.Label>Stock:</Form.Label>
									<Form.Control type='number' min='0' />
								</Form.Group>
								<Form.Group controlId='price'>
									<Form.Label>Tax(%):</Form.Label>
									<Form.Control type='number' min='0' />
								</Form.Group>
								<Form.Group controlId='product-category'>
									<Form.Label>Category:</Form.Label>
									<Form.Control as='select'>
										<option value=''>Choose category</option>
										{categories.map((category) => (
											<option key={category.id} value={category.id}>
												{category.name}
											</option>
										))}
									</Form.Control>
								</Form.Group>
								<Form.Group controlId='description'>
									<Form.Label>Description:</Form.Label>
									<Form.Control as='textarea' rows='5' />
								</Form.Group>
								<Form.Row className='align-items-center'>
									<Col>
										<Form.Check
											type='switch'
											id='active-switch'
											label='Active'
										/>
									</Col>
									<Col>
										<Button
											type='submit'
											variant='primary'
											className='d-block ml-auto px-4 py-2'>
											Save
										</Button>
									</Col>
								</Form.Row>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Layout>
	);
};

export default AdminProductsEdit;
