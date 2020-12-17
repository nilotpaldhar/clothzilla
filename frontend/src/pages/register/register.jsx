import React from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Spinner from 'react-spinkit';

import FormContainer from '../../components/form-container/form-container.component';
import FormikInput from '../../components/formik-input/formik-input.component';
import schema from './register-validation.schema';

const Register = () => {
	const handleSubmit = (values, { setSubmitting, resetForm }) => {
		console.log(values);
		setTimeout(() => {
			setSubmitting(false);
			resetForm();
		}, 3000);
	};

	return (
		<FormContainer title='Please fill in this form to register with us'>
			<Formik
				initialValues={{ name: '', email: '', password: '' }}
				validationSchema={schema}
				onSubmit={handleSubmit}>
				{(props) => (
					<Form>
						<FormikInput id='name' label='Name' type='text' name='name' />
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
							{props.isSubmitting ? <Spinner color='white' /> : 'Register'}
						</Button>
					</Form>
				)}
			</Formik>

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
