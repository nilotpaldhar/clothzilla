import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Card, Image } from 'react-bootstrap';

import Layout from '../../components/layout/layout.component';
import ProductEditForm from '../../components/product-edit-form/product-edit-form.component';
import ProductImageUpload from '../../components/product-image-upload/product-image-upload.component';
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
					<Col xs={12} lg={8} className='mb-4 mb-lg-0'>
						<Card>
							<Card.Header>Edit Product</Card.Header>
							<Card.Body>
								<ProductEditForm productDetails={productDetails} />
							</Card.Body>
						</Card>
					</Col>
					<Col xs={12} lg={4}>
						<Row>
							<Col lg={12} className='mb-4'>
								<Image
									src={productDetails.image}
									alt={productDetails.name}
									className='mb-4 rounded w-100'
								/>
								<ProductImageUpload id={productDetails._id} />
							</Col>
						</Row>
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
