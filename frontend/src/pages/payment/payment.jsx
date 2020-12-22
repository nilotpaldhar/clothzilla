import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, Form, Button, Col } from 'react-bootstrap';

import Layout from '../../components/layout/layout.component';
import CheckoutSteps from '../../components/checkout-steps/checkout-steps.component';

import { savePaymentMethod } from '../../redux/cart/cart.actions';
import { createNotification } from '../../redux/notification/notification.actions';

const Payment = ({ savePaymentMethod, createNotification }) => {
	const history = useHistory();
	const [paymentMethod, setPaymentMethod] = useState('');

	const handleSubmit = (_evt) => {
		_evt.preventDefault();
		if (!paymentMethod) {
			createNotification('Please choose your payment method', 'error');
			return;
		}
		savePaymentMethod(paymentMethod);
		history.push('/placeorder');
	};

	return (
		<Layout>
			<Card>
				<Card.Header>
					<CheckoutSteps step1 step2 step3 />
				</Card.Header>
				<Card.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Label as='legend' className='mb-3'>
								Select Payment Method:
							</Form.Label>
							<Col className='mb-1'>
								<Form.Check
									custom
									type='radio'
									label='PayPal or Credit Card'
									id='paypal'
									name='paymentMethod'
									value='paypal'
									onChange={(e) => setPaymentMethod(e.target.value)}
								/>
							</Col>
							<Col>
								<Form.Check
									custom
									type='radio'
									label='Stripe'
									id='stripe'
									name='paymentMethod'
									value='stripe'
									onChange={(e) => setPaymentMethod(e.target.value)}
								/>
							</Col>
						</Form.Group>
						<Button type='submit' variant='primary' className='px-4 py-2 mt-2'>
							Next
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</Layout>
	);
};

const mapDispatchToProps = (dispatch) => ({
	savePaymentMethod: (method) => dispatch(savePaymentMethod(method)),
	createNotification: (message, variant) =>
		dispatch(createNotification(message, variant)),
});

export default connect(null, mapDispatchToProps)(Payment);
