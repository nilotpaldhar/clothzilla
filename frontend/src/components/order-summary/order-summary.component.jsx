import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';

import Chip from '../chip/chip.component';

import styles from './order-summary.module.scss';

const OrderSummary = ({ showStatus }) => {
	return (
		<ListGroup variant='flush' className={styles.list}>
			<ListGroupItem>
				<h2>Shipping Details:</h2>
				<div className={styles.details}>
					<span>
						<strong>Name:</strong> John Doe
					</span>
					<span>
						<strong>Email:</strong> john@example.com
					</span>
					<span>
						<strong>Address:</strong> 4606 Edgewood Avenue, Illinois, 60668, USA
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
					<span>
						<FontAwesomeIcon icon={faPaypal} /> Paypal
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
					<li>
						<span>Blue Dress For Women</span>
						<span>1 x $75.99 = 75.99</span>
					</li>
					<li>
						<span>White Shirt for Men</span>
						<span>1 x $75.99 = 75.99</span>
					</li>
					<li>
						<span>Black Jacket For Women</span>
						<span>1 x $75.99 = 75.99</span>
					</li>
				</ul>
			</ListGroupItem>
		</ListGroup>
	);
};

export default OrderSummary;
