import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

import Layout from '../../components/layout/layout.component';

import styles from './billing.module.scss';

const Billing = ({ history }) => {
	const handleSubmit = (_evt) => {
		_evt.preventDefault();
		history.push('/payment');
	};

	return (
		<Layout>
			<Row className='justify-content-center'>
				<Col xs={12} sm={10} md={8}>
					<div className={styles.form}>
						<h1>Billing Details</h1>

						<Form onSubmit={handleSubmit}>
							<Form.Row>
								<Col xs={6}>
									<Form.Group controlId='name'>
										<Form.Label>Name:</Form.Label>
										<Form.Control type='text' />
									</Form.Group>
								</Col>
								<Col xs={6}>
									<Form.Group controlId='email'>
										<Form.Label>Email:</Form.Label>
										<Form.Control type='email' />
									</Form.Group>
								</Col>
							</Form.Row>
							<Form.Group controlId='address'>
								<Form.Label>Address:</Form.Label>
								<Form.Control type='text' />
							</Form.Group>
							<Form.Row>
								<Col xs={6}>
									<Form.Group controlId='city'>
										<Form.Label>Town/City:</Form.Label>
										<Form.Control type='text' />
									</Form.Group>
								</Col>
								<Col xs={6}>
									<Form.Group controlId='postalCode'>
										<Form.Label>Postcode/ZIP:</Form.Label>
										<Form.Control type='text' />
									</Form.Group>
								</Col>
							</Form.Row>
							<Form.Group controlId='country'>
								<Form.Label>Country:</Form.Label>
								<Form.Control type='text' />
							</Form.Group>
							<Button type='submit' className='d-block ml-auto'>
								Continue
							</Button>
						</Form>
					</div>
				</Col>
			</Row>
		</Layout>
	);
};

export default Billing;
