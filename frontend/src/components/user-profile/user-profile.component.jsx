import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const UserProfile = () => {
	return (
		<Card>
			<Card.Header as='h1'>Edit Profile</Card.Header>
			<Card.Body>
				<Form>
					<Form.Group controlId='name'>
						<Form.Label>Name:</Form.Label>
						<Form.Control type='text' />
					</Form.Group>
					<Form.Group controlId='email'>
						<Form.Label>Email:</Form.Label>
						<Form.Control type='email' />
					</Form.Group>
					<Button type='submit' variant='primary' className='px-4 py-2'>
						Save
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default UserProfile;
