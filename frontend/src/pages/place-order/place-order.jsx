import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

import Layout from '../../components/layout/layout.component';
import CheckoutSteps from '../../components/checkout-steps/checkout-steps.component';
import OrderSummary from '../../components/order-summary/order-summary.component';
import OrderPriceSummary from '../../components/order-price-summary/order-price-summary.component';

const PlaceOrder = ({ history }) => {
	return (
		<Layout>
			<Card>
				<Card.Header>
					<CheckoutSteps step1 step2 step3 step4 />
				</Card.Header>
				<Card.Body>
					<Row>
						<Col xs={12} lg={8} className='mb-3'>
							<OrderSummary />
						</Col>
						<Col xs={12} lg={4}>
							<OrderPriceSummary
								title='Order Summary'
								itemsPrice={227.97}
								shippingPrice={0.0}
								taxPrice={45.59}
								totalPrice={273.56}
							/>
							<Button
								type='submit'
								variant='primary'
								className='mt-2 btn-block btn-lg rounded'
								onClick={() => history.push('/order/1')}>
								Place Order
							</Button>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</Layout>
	);
};

export default PlaceOrder;
