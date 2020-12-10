import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const UserSecurity = () => {
	return (
		<Card>
			<Card.Header as='h1'>Edit Security Details</Card.Header>
			<Card.Body>
				<Form>
					<Form.Group controlId='current-password'>
						<Form.Label>Current Password:</Form.Label>
						<Form.Control type='password' />
					</Form.Group>

					<Form.Group controlId='new-password'>
						<Form.Label>New Password:</Form.Label>
						<Form.Control type='password' placeholder='Enter Password' />
					</Form.Group>

					<Form.Group controlId='password-confirm'>
						<Form.Label className='sr-only'>Confirm Password:</Form.Label>
						<Form.Control type='password' placeholder='Confirm Password' />
					</Form.Group>

					<Button type='submit' variant='primary' className='px-4 py-2'>
						Save
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default UserSecurity;
