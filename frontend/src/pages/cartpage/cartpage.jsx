import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Button } from 'react-bootstrap';
import { trackWindowScroll } from 'react-lazy-load-image-component';

import Layout from '../../components/layout/layout.component';
import CartItem from '../../components/cart-item/cart-item.component';

import styles from './cartpage.module.scss';

import {
	selectCartItems,
	selectCartTotal,
} from '../../redux/cart/cart.selectors';
import { selectIsAuthenticated } from '../../redux/user/user.selectors';

const Cartpage = ({
	history,
	cartItems,
	cartTotal,
	isAuthenticated,
	scrollPosition,
}) => {
	const handleCheckout = () => {
		const redirect = isAuthenticated ? '/shipping' : '/login?redirect=shipping';
		history.push(redirect);
	};

	return (
		<Layout>
			<div className={styles.container}>
				<div className={styles.header}>
					<Row>
						<Col xs={4}>Product</Col>
						<Col xs={2}>Price</Col>
						<Col xs={3}>Quantity</Col>
						<Col xs={1}>Total</Col>
						<Col xs={2} className='text-center'>
							Remove
						</Col>
					</Row>
				</div>
				<div className={styles.body}>
					{cartItems.length === 0 ? (
						<h1 className='text-center py-5 h3'>Your cart is empty</h1>
					) : (
						cartItems.map((item) => (
							<CartItem
								key={item.product}
								item={item}
								scrollPosition={scrollPosition}
							/>
						))
					)}
				</div>
				{cartItems.length > 0 && (
					<div className={styles.footer}>
						<Row className='align-items-center'>
							<Col sm={7} md={8} lg={9}>
								<Button
									variant='primary'
									className='px-4 py-2'
									onClick={handleCheckout}>
									Go to Checkout
								</Button>
							</Col>
							<Col sm={5} md={4} lg={3}>
								<span>Total ${cartTotal}</span>
							</Col>
						</Row>
					</div>
				)}
			</div>
		</Layout>
	);
};

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
	cartTotal: selectCartTotal,
	isAuthenticated: selectIsAuthenticated,
});

export default connect(mapStateToProps)(trackWindowScroll(Cartpage));
