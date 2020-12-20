import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import Layout from '../../components/layout/layout.component';
import CartItem from '../../components/cart-item/cart-item.component';

import styles from './cartpage.module.scss';

import {
	seletctCartItems,
	seletctCartTotal,
} from '../../redux/cart/cart.selectors';

const Cartpage = ({ cartItems, cartTotal }) => {
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
						cartItems.map((item) => <CartItem key={item.product} item={item} />)
					)}
				</div>
				{cartItems.length > 0 && (
					<div className={styles.footer}>
						<Row className='align-items-center'>
							<Col sm={7} md={8} lg={9}>
								<Link to='/shipping' className='btn btn-primary px-4 py-2'>
									Go to Checkout
								</Link>
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
	cartItems: seletctCartItems,
	cartTotal: seletctCartTotal,
});

export default connect(mapStateToProps)(Cartpage);
