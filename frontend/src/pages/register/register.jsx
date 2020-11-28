import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import FormContainer from '../../components/form-container/form-container.component';

const Register = () => {
	const handleSubmit = (_evt) => {
		_evt.preventDefault();
	};

	return (
		<FormContainer title='Please fill in this form to register with us'>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId='name'>
					<Form.Label>Name:</Form.Label>
					<Form.Control type='text' />
				</Form.Group>
				<Form.Group controlId='email'>
					<Form.Label>Email:</Form.Label>
					<Form.Control type='email' />
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>Password:</Form.Label>
					<Form.Control type='password' />
				</Form.Group>
				<Form.Group controlId='password-confirmation'>
					<Form.Label>Confirm Password:</Form.Label>
					<Form.Control type='password' />
				</Form.Group>
				<Button
					type='submit'
					variant='primary'
					className='btn-block mt-4 text-uppercase'>
					Register
				</Button>
			</Form>

			<div className='mt-5 text-center text-secondary'>
				Already have an account?
				<Link to='/login' className='text-decoration-none ml-1'>
					Sign In
				</Link>
			</div>
		</FormContainer>
	);
};

export default Register;
