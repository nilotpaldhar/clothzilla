import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import ProductQuantity from '../product-quantity/product-quantity.component';
import styles from './cart-item.module.scss';

const CartItem = ({ item }) => {
	return (
		<div className={styles.item}>
			<Row className='align-items-center'>
				<Col xs={12} md={4}>
					<Row className='align-items-center'>
						<Col xs={12} md={4} className='mb-4 mb-md-0'>
							<Image src={item.image} alt={item.name} fluid />
						</Col>
						<Col xs={12} md={8}>
							<Link to={`/product/${item.id}`}>{item.name}</Link>
						</Col>
					</Row>
				</Col>

				<Col xs={5} md={2} className='my-3 my-md-0'>
					<span className='d-md-none'>Price:</span> ${item.salePrice}
				</Col>

				<Col xs={7} md={3} className='d-flex justify-content-end d-md-block'>
					<ProductQuantity />
				</Col>

				<Col xs={5} md={1} className='my-3 my-md-0'>
					<span className='d-md-none'>Total:</span> $1000
				</Col>

				<Col
					xs={7}
					md={2}
					className='d-flex justify-content-end d-md-block text-md-center'>
					<button type='button'>
						<FontAwesomeIcon icon={faTimes} />
					</button>
				</Col>
			</Row>
		</div>
	);
};

export default CartItem;
