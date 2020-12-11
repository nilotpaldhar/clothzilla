import React from 'react';
import { Card } from 'react-bootstrap';

import Layout from '../../components/layout/layout.component';
import CheckoutSteps from '../../components/checkout-steps/checkout-steps.component';
import ShippingForm from '../../components/shipping-form/shipping-form.component';

const Shipping = () => {
	return (
		<Layout>
			<Card>
				<Card.Header>
					<CheckoutSteps step1 step2 />
				</Card.Header>
				<Card.Body>
					<ShippingForm />
				</Card.Body>
			</Card>
		</Layout>
	);
};

export default Shipping;
