import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col } from 'react-bootstrap';

import Product from '../product/product.component';
import Spinner from '../spinner/spinner.component';
import Message from '../message/message.component';
import { fetchRelatedProduct } from '../../redux/related-product/related-product.actions';
import {
	selectLoading,
	selectError,
	selectRelatedProducts,
} from '../../redux/related-product/related-product.selectors';

import styles from './related-products.module.scss';

const RelatedProducts = ({
	productId,
	productSlug,
	fetchRelatedProduct,
	loading,
	error,
	relatedProducts,
}) => {
	useEffect(() => {
		if (productSlug && productId) {
			fetchRelatedProduct(productSlug, productId);
		}
	}, [fetchRelatedProduct, productSlug, productId]);
	return (
		<div>
			<div className={styles.related}>
				<h2>Related Products</h2>
				<Row>
					{loading ? (
						<Spinner />
					) : error ? (
						<Message>{error}</Message>
					) : (
						<>
							{relatedProducts.map((product) => (
								<Col key={product._id} xs={12} md={6} lg={3}>
									<Product product={product} />
								</Col>
							))}
						</>
					)}
				</Row>
			</div>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: selectLoading,
	error: selectError,
	relatedProducts: selectRelatedProducts,
});

const mapDispatchToProps = (dispatch) => ({
	fetchRelatedProduct: (slug, id) => dispatch(fetchRelatedProduct(slug, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RelatedProducts);
