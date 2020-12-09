import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import Layout from '../../components/layout/layout.component';
import CartItem from '../../components/cart-item/cart-item.component';

import styles from './cartpage.module.scss';

import data from '../../sample-data/cart';

const Cartpage = () => {
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
					{data.map((item) => (
						<CartItem key={item.id} item={item} />
					))}
				</div>
				<div className={styles.footer}>
					<Row className='align-items-center'>
						<Col sm={7} md={8} lg={9}>
							<Link to='/shipping' className='btn btn-primary px-4 py-2'>
								Go to Checkout
							</Link>
						</Col>
						<Col sm={5} md={4} lg={3}>
							<span>Total $216.00</span>
						</Col>
					</Row>
				</div>
			</div>
		</Layout>
	);
};

export default Cartpage;
