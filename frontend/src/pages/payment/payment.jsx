import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

import Layout from '../../components/layout/layout.component';
import OrderDetails from '../../components/order-details/order-details.component';

const Payment = ({ history }) => {
	const handleSubmit = (_evt) => {
		_evt.preventDefault();
		history.push('/placeorder');
	};

	return (
		<Layout>
			<Row className='justify-content-center'>
				<Col xs={12} sm={10} md={8}>
					<OrderDetails>
						<Form onSubmit={handleSubmit}>
							<Form.Group>
								<Form.Check
									type='radio'
									label='PayPal or Credit Card'
									id='paypal'
									name='paymentMethod'
									value='paypal'
								/>
							</Form.Group>
							<Form.Group>
								<Form.Check
									type='radio'
									label='Stripe'
									id='stripe'
									name='paymentMethod'
									value='stripe'
								/>
							</Form.Group>
							<Button
								type='submit'
								variant='primary'
								className='d-block ml-auto'>
								Place Order
							</Button>
						</Form>
					</OrderDetails>
				</Col>
			</Row>
		</Layout>
	);
};

export default Payment;
