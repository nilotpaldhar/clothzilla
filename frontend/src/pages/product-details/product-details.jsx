import React, { useEffect } from 'react';
import { Row, Col, Image, Button, Tabs, Tab } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
import ShowMoreText from 'react-show-more-text';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import Layout from '../../components/layout/layout.component';
import Product from '../../components/product/product.component';
import ProductQuantity from '../../components/product-quantity/product-quantity.component';
import ReviewCollection from '../../components/review-collection/review-collection.component';
import ReviewForm from '../../components/review-form/review-form.component';

import products from '../../sample-data/products';
import reviews from '../../sample-data/reviews';

import styles from './product-details.module.scss';

const ProductDetails = ({ match }) => {
	useEffect(() => {
		window.scrollTo(0, 0);
	});

	const product = products.find((item) => item.id === Number(match.params.id));
	const relatedProducts = products.filter((item, idx) => idx < 3);

	return (
		<Layout>
			<Row>
				<Col xs={12} lg={4} className='mb-5 mb-lg-0'>
					<Image src={product.image} alt={product.name} fluid />
				</Col>
				<Col xs={12} lg={8}>
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
						<ProductQuantity />
						<Button variant='primary' className={styles.btn}>
							<FontAwesomeIcon icon={faShoppingCart} />
							<span className='ml-2'>Go to Cart</span>
						</Button>
					</div>
				</Col>
			</Row>
			<div className={styles.reviewContainer}>
				<Tabs defaultActiveKey='reviews' id='uncontrolled-tab-example'>
					<Tab eventKey='reviews' title='Reviews & Ratings'>
						<ReviewCollection reviews={reviews} />
					</Tab>
					<Tab eventKey='addReview' title='Rate Product'>
						<ReviewForm />
					</Tab>
				</Tabs>
			</div>
			<div className={styles.related}>
				<h2>Related Products</h2>
				<Row>
					{relatedProducts.map((product) => (
						<Col key={product.id} xs={12} sm={6} lg={4}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			</div>
		</Layout>
	);
};

export default ProductDetails;
