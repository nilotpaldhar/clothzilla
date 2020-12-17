import React from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Spinner from 'react-spinkit';

import FormContainer from '../../components/form-container/form-container.component';
import FormikInput from '../../components/formik-input/formik-input.component';
import schema from './login-validation-schema';

const Login = () => {
	const handleSubmit = (values, { setSubmitting, resetForm }) => {
		console.log(values);
		setTimeout(() => {
			setSubmitting(false);
			resetForm();
		}, 3000);
	};

	return (
		<FormContainer title='Sign In with your email and password'>
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				validationSchema={schema}
				onSubmit={handleSubmit}>
				{(props) => (
					<Form>
						<FormikInput id='email' label='Email' type='email' name='email' />
						<FormikInput
							id='password'
							label='Password'
							type='password'
							name='password'
						/>
						<Button
							type='submit'
							variant='primary'
							className='btn-block mt-4 text-uppercase'
							disabled={props.isSubmitting}>
							{props.isSubmitting ? <Spinner color='white' /> : 'Login'}
						</Button>
					</Form>
				)}
			</Formik>

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
