import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faLock,
	faTruck,
	faDollarSign,
	faReceipt,
} from '@fortawesome/free-solid-svg-icons';

import styles from './checkout-steps.module.scss';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
	return (
		<nav className={styles.steps}>
			<ul>
				<li>
					<Link
						to='/login'
						className={cx(styles.link, {
							[styles.active]: step1,
							[styles.disabled]: !step1,
						})}>
						<span>
							<FontAwesomeIcon icon={faLock} />
						</span>
						Sign In
					</Link>
				</li>
				<li>
					<Link
						to='/shipping'
						className={cx(styles.link, {
							[styles.active]: step2,
							[styles.disabled]: !step2,
						})}>
						<span>
							<FontAwesomeIcon icon={faTruck} />
						</span>
						Shipping
					</Link>
				</li>
				<li>
					<Link
						to='/payment'
						className={cx(styles.link, {
							[styles.active]: step3,
							[styles.disabled]: !step3,
						})}>
						<span>
							<FontAwesomeIcon icon={faDollarSign} />
						</span>
						Payment
					</Link>
				</li>
				<li>
					<Link
						to='/placeorder'
						className={cx(styles.link, {
							[styles.active]: step4,
							[styles.disabled]: !step4,
						})}>
						<span>
							<FontAwesomeIcon icon={faReceipt} />
						</span>
						Place Order
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default CheckoutSteps;
