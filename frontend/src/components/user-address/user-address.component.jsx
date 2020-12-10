import React from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';

const UserAddress = () => {
	return (
		<Card>
			<Card.Header as='h1'>Edit Shipping Address</Card.Header>
			<Card.Body>
				<Form>
					<Form.Group controlId='address'>
						<Form.Label>Address:</Form.Label>
						<Form.Control type='text' />
					</Form.Group>
					<Row>
						<Col>
							<Form.Group controlId='city'>
								<Form.Label>Town / City:</Form.Label>
								<Form.Control type='text' />
							</Form.Group>
						</Col>
						<Col>
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
						Save
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default UserAddress;
