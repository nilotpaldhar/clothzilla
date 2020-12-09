import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';

import Layout from '../../components/layout/layout.component';
import CheckoutSteps from '../../components/checkout-steps/checkout-steps.component';
import ShippingForm from '../../components/shipping-form/shipping-form.component';

const Shipping = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

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
