import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Image, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import ShowMoreText from 'react-show-more-text';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import Layout from '../../components/layout/layout.component';
import RelatedProducts from '../../components/related-products/related-products.component';
import ReviewCollection from '../../components/review-collection/review-collection.component';
import ReviewForm from '../../components/review-form/review-form.component';
import Message from '../../components/message/message.component';
import Spinner from '../../components/spinner/spinner.component';

import { fetchProductDetails } from '../../redux/product-details/product-details.actions';
import {
	selectLoading,
	selectError,
	selectProduct,
} from '../../redux/product-details/product-details.selectors';
import { addItemToCart } from '../../redux/cart/cart.actions';
import { seletctCartItems } from '../../redux/cart/cart.selectors';
import { existingCartItem } from '../../redux/cart/cart.utils';

import styles from './product-details.module.scss';

const ProductDetails = ({
	match,
	fetchProductDetails,
	loading,
	error,
	product,
	cartItems,
	addItemToCart,
}) => {
	const { slug, id } = match.params;

	useEffect(() => {
		fetchProductDetails(slug, id);
	}, [fetchProductDetails, id, slug]);

	return (
		<Layout>
			{loading ? (
				<Spinner />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Row>
						<Col xs={12} lg={5} className='mb-5 mb-lg-0'>
							<Image src={product.image} alt={product.name} fluid />
						</Col>
						<Col xs={12} lg={7}>
							<h1 className={styles.name}>{product.name}</h1>
							<div className={styles.details}>
								<div
									className={cx(styles.stock, {
										[styles.noStock]: product.stock === 0,
									})}>
									{product.stock === 0 ? 'out of stock' : 'in stock'}
								</div>
								<div className={styles.pricing}>
									<span className='text-primary'>${product.salePrice}</span>
									<span>
										<del>${product.listPrice}</del>
									</span>
									<span className='text-success'>{product.discount}% off</span>
								</div>
								<div className={styles.rating}>
									<StarRatingComponent
										name='product-details-star-rating'
										editing={false}
										starCount={5}
										value={product.rating}
									/>
									<span>({product.reviewCount})</span>
								</div>
							</div>
							<ShowMoreText
								lines={5}
								className={styles.desc}
								more='Read more'
								less='Read less'>
								{product.description}
							</ShowMoreText>
							<div className={styles.actions}>
								{existingCartItem(cartItems, { product: product._id }) ? (
									<Link to='/cart' className='btn btn-primary'>
										<FontAwesomeIcon icon={faShoppingCart} />
										<span className='ml-2'>Go to Cart</span>
									</Link>
								) : (
									<button
										className='btn btn-primary'
										onClick={() => addItemToCart(product)}>
										<FontAwesomeIcon icon={faShoppingCart} />
										<span className='ml-2'>Add to Cart</span>
									</button>
								)}
							</div>
						</Col>
					</Row>
					<div className={styles.reviewContainer}>
						<Tabs defaultActiveKey='reviews' id='uncontrolled-tab-example'>
							<Tab eventKey='reviews' title='Reviews & Ratings'>
								<ReviewCollection productId={product._id} />
							</Tab>
							<Tab eventKey='addReview' title='Rate Product'>
								<ReviewForm />
							</Tab>
						</Tabs>
					</div>
					<RelatedProducts productId={product._id} productSlug={product.slug} />
				</>
			)}
		</Layout>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: selectLoading,
	error: selectError,
	product: selectProduct,
	cartItems: seletctCartItems,
});

const mapDispatchToProps = (dispatch) => ({
	fetchProductDetails: (slug, id) => dispatch(fetchProductDetails(slug, id)),
	addItemToCart: (product) => dispatch(addItemToCart(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
