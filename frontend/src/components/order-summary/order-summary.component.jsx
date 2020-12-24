import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaypal, faStripe } from '@fortawesome/free-brands-svg-icons';
import { format } from 'date-fns';

import Chip from '../chip/chip.component';

import styles from './order-summary.module.scss';

const OrderSummary = ({
	showStatus,
	items = [],
	shippingAddress = {},
	paymentMethod,
	paymentDetails,
	deliveryDetails,
	status,
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
						{deliveryDetails.isDelivered ? (
							<Chip variant='success'>
								<>Delivered on </>
								{format(new Date(deliveryDetails.deliveredAt), 'MMM dd, yyyy')}
							</Chip>
						) : (
							<>
								{!status ? (
									'---'
								) : (
									<Chip
										variant={
											status === 'processing'
												? 'warning'
												: status === 'cancelled'
												? 'danger'
												: 'success'
										}>
										{status}
									</Chip>
								)}
							</>
						)}
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
						{paymentDetails.isPaid ? (
							<Chip variant='success'>
								<>Paid On </>
								{format(new Date(paymentDetails.paidAt), 'MMM dd, yyyy')}
							</Chip>
						) : (
							<Chip variant='danger'>Not Paid</Chip>
						)}
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
