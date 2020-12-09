import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import styles from './order-price-summary.module.scss';

const OrderPriceSummary = ({
	title,
	itemsPrice,
	shippingPrice,
	taxPrice,
	totalPrice,
}) => {
	return (
		<ListGroup className={styles.list}>
			<ListGroupItem>
				<h2>{title}</h2>
			</ListGroupItem>

			<ListGroupItem>
				<span>Items</span>
				<span>${itemsPrice}</span>
			</ListGroupItem>

			<ListGroupItem>
				<span>Shipping</span>
				<span>${shippingPrice}</span>
			</ListGroupItem>

			<ListGroupItem>
				<span>Tax</span>
				<span>${taxPrice}</span>
			</ListGroupItem>

			<ListGroupItem>
				<span>Total</span>
				<span>${totalPrice}</span>
			</ListGroupItem>
		</ListGroup>
	);
};

export default OrderPriceSummary;
