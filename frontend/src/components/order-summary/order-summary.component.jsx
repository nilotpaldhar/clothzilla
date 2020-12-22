import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaypal, faStripe } from '@fortawesome/free-brands-svg-icons';

import Chip from '../chip/chip.component';

import styles from './order-summary.module.scss';

const OrderSummary = ({
	showStatus,
	items = [],
	shippingAddress = {},
	paymentMethod,
}) => {
	const paymentIcon =
		paymentMethod && paymentMethod.toLowerCase() === 'stripe'
			? faStripe
			: faPaypal;

	const { name, email, address, city, postalCode, country } = shippingAddress;

	return (
		<ListGroup variant='flush' className={styles.list}>
			<ListGroupItem>
				<h2>Shipping Details:</h2>
				<div className={styles.details}>
					<span>
						<strong>Name: </strong>
						{name}
					</span>
					<span>
						<strong>Email: </strong>
						{email}
					</span>
					<span>
						<strong>Address: </strong>
						{address}, {city},{postalCode}, {country}
					</span>
				</div>
			</ListGroupItem>

			{showStatus && (
				<ListGroupItem>
					<h2>Delivery Status:</h2>
					<div className={styles.details}>
						<Chip variant='warning'>Processing</Chip>
					</div>
				</ListGroupItem>
			)}

			<ListGroupItem>
				<h2>Payment Method:</h2>
				<div className={styles.payment}>
					<span className='text-capitalize'>
						<FontAwesomeIcon icon={paymentIcon} /> {paymentMethod}
					</span>
				</div>
			</ListGroupItem>

			{showStatus && (
				<ListGroupItem>
					<h2>Payment Status:</h2>
					<div className={styles.details}>
						<Chip variant='success'>Paid on Tuesday, 8 December 2020</Chip>
					</div>
				</ListGroupItem>
			)}

			<ListGroupItem>
				<h2>Ordered Items:</h2>
				<ul>
					{items &&
						items.map((item) => (
							<li key={item.product}>
								<span>{item.name}</span>
								<span>
									{item.quantity} x ${item.price} = ${item.total}
								</span>
							</li>
						))}
				</ul>
			</ListGroupItem>
		</ListGroup>
	);
};

export default OrderSummary;
