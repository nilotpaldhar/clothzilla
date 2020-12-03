import React from 'react';
import styles from './order-details.module.scss';

const OrderDetails = ({ children }) => {
	return (
		<div className={styles.details}>
			<div>
				<h1>Your Orders</h1>
				<h3>
					<span>Products</span> <span>Price</span>
				</h3>
				<ul>
					{[1, 2, 3].map((n) => (
						<li key={n}>
							<span>
								Blue Dress For Women x <strong>3</strong>
							</span>
							<span>$75.00</span>
						</li>
					))}
				</ul>
				<h3>
					<span>Total</span> <span>$750</span>
				</h3>
			</div>
			<div className={styles.body}>{children}</div>
		</div>
	);
};

export default OrderDetails;
