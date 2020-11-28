import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import FormContainer from '../../components/form-container/form-container.component';

const Login = () => {
	const handleSubmit = (_evt) => {
		_evt.preventDefault();
	};

	return (
		<FormContainer title='Sign In with your email and password'>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId='email'>
					<Form.Label>Email:</Form.Label>
					<Form.Control type='email' />
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>Password:</Form.Label>
					<Form.Control type='password' />
				</Form.Group>
				<Button
					type='submit'
					variant='primary'
					className='btn-block mt-4 text-uppercase'>
					Login
				</Button>
			</Form>

			<div className='mt-5 text-center text-secondary'>
				Don't have an account?
				<Link to='/register' className='text-decoration-none ml-1'>
					Register
				</Link>
			</div>
		</FormContainer>
	);
};

export default Login;
