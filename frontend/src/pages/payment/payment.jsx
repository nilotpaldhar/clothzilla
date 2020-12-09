import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Form, Button, Col } from 'react-bootstrap';

import Layout from '../../components/layout/layout.component';
import CheckoutSteps from '../../components/checkout-steps/checkout-steps.component';

const Payment = () => {
	const history = useHistory();

	const handleSubmit = (_evt) => {
		_evt.preventDefault();
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
									value='PayPal'
									checked
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

export default Payment;
