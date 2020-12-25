import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Card } from 'react-bootstrap';

import Layout from '../../components/layout/layout.component';
import ProductImage from '../../components/product-image/product-image.component';
import ProductEditForm from '../../components/product-edit-form/product-edit-form.component';
import Message from '../../components/message/message.component';
import Spinner from '../../components/spinner/spinner.component';

import { fetchAdminProductDetails } from '../../redux/admin-product-details/admin-product-details.actions';
import {
	selectProductDetailsLoading,
	selectProductDetailsError,
	selectProductDetails,
} from '../../redux/admin-product-details/admin-product-details.selectors';

const AdminProductsEdit = ({
	match,
	fetchProductDetails,
	loading,
	error,
	productDetails,
}) => {
	const id = match.params.id;

	useEffect(() => {
		fetchProductDetails(id);
	}, [fetchProductDetails, id]);

	return (
		<Layout>
			{loading ? (
				<Spinner />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					<Col xs={12} lg={4} className='order-2 order-lg-1'>
						<Row>
							<Col lg={12} className='mb-4'>
								<ProductImage src={productDetails.image} />
							</Col>
						</Row>
					</Col>
					<Col xs={12} lg={8} className='order-1 order-lg-2 mb-4 mb-lg-0'>
						<Card>
							<Card.Header>Edit Product</Card.Header>
							<Card.Body>
								<ProductEditForm productDetails={productDetails} />
							</Card.Body>
						</Card>
					</Col>
				</Row>
			)}
		</Layout>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: selectProductDetailsLoading,
	error: selectProductDetailsError,
	productDetails: selectProductDetails,
});

const mapDispatchToProps = (dispatch) => ({
	fetchProductDetails: (id) => dispatch(fetchAdminProductDetails(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductsEdit);
