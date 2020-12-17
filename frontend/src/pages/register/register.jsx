import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Spinner from 'react-spinkit';

import FormContainer from '../../components/form-container/form-container.component';
import FormikInput from '../../components/formik-input/formik-input.component';
import Message from '../../components/message/message.component';

import schema from './register-validation.schema';
import { registerAsync } from '../../redux/auth/auth.actions';
import { selectRegisterError } from '../../redux/auth/auth.selectors';

const Register = ({ history, register, error }) => {
	const handleSubmit = (values, { setSubmitting }) => {
		register(values)
			.then(() => history.push('/'))
			.catch(() => setSubmitting(false));
	};

	return (
		<FormContainer title='Please fill in this form to register with us'>
			{error && <Message variant='danger'>{error}</Message>}
			<Formik
				initialValues={{
					name: '',
					email: '',
					password: '',
					passwordConfirmation: '',
				}}
				validationSchema={schema}
				onSubmit={handleSubmit}>
				{(props) => (
					<Form>
						<FormikInput id='name' label='Name:' type='text' name='name' />
						<FormikInput id='email' label='Email:' type='email' name='email' />
						<FormikInput
							id='password'
							label='Password (Minimum 8 characters):'
							type='password'
							name='password'
						/>
						<FormikInput
							id='passwordConfirmation'
							label='Confirm Password:'
							type='password'
							name='passwordConfirmation'
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

const mapStateToProps = createStructuredSelector({
	error: selectRegisterError,
});

const mapDispatchToProps = (dispatch) => ({
	register: (userData) => dispatch(registerAsync(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
