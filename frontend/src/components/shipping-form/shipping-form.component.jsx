import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const ShippingForm = () => {
	const history = useHistory();

	const handleSubmit = (_evt) => {
		_evt.preventDefault();
		history.push('/payment');
	};
	return (
		<Form onSubmit={handleSubmit}>
			<Row>
				<Col md={6}>
					<Form.Group controlId='name'>
						<Form.Label>Name:</Form.Label>
						<Form.Control type='text' />
					</Form.Group>
				</Col>
				<Col md={6}>
					<Form.Group controlId='email'>
						<Form.Label>Email:</Form.Label>
						<Form.Control type='email' />
					</Form.Group>
				</Col>
			</Row>
			<Form.Group controlId='address'>
				<Form.Label>Address:</Form.Label>
				<Form.Control type='text' />
			</Form.Group>
			<Row>
				<Col md={6}>
					<Form.Group controlId='city'>
						<Form.Label>Town / City:</Form.Label>
						<Form.Control type='text' />
					</Form.Group>
				</Col>
				<Col md={6}>
					<Form.Group controlId='postcode'>
						<Form.Label>Postcode / ZIP:</Form.Label>
						<Form.Control type='text' />
					</Form.Group>
				</Col>
			</Row>
			<Form.Group controlId='country'>
				<Form.Label>Country:</Form.Label>
				<Form.Control type='text' />
			</Form.Group>
			<Button type='submit' variant='primary' className='px-4 py-2'>
				Next
			</Button>
		</Form>
	);
};

export default ShippingForm;
