import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import ProductQuantity from '../product-quantity/product-quantity.component';
import styles from './cart-item.module.scss';

import { clearItemFromCart } from '../../redux/cart/cart.actions';

const CartItem = ({ item, clearItem }) => {
	return (
		<div className={styles.item}>
			<Row className='align-items-center'>
				<Col xs={12} md={4}>
					<Row className='align-items-center'>
						<Col xs={12} md={4} className='mb-4 mb-md-0'>
							<Image src={item.image} alt={item.name} fluid />
						</Col>
						<Col xs={12} md={8}>
							<Link to={`/product/${item.slug}/${item.product}`}>
								{item.name}
							</Link>
						</Col>
					</Row>
				</Col>

				<Col xs={5} md={2} className='my-3 my-md-0'>
					<span className='d-md-none'>Price:</span> ${item.price}
				</Col>

				<Col xs={7} md={3} className='d-flex justify-content-end d-md-block'>
					<ProductQuantity product={item} />
				</Col>

				<Col xs={5} md={1} className='my-3 my-md-0'>
					<span className='d-md-none'>Total:</span>${item.total}
				</Col>

				<Col
					xs={7}
					md={2}
					className='d-flex justify-content-end d-md-block text-md-center'>
					<button type='button' onClick={() => clearItem(item)}>
						<FontAwesomeIcon icon={faTimes} />
					</button>
				</Col>
			</Row>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	clearItem: (product) => dispatch(clearItemFromCart(product)),
});

export default connect(null, mapDispatchToProps)(CartItem);
