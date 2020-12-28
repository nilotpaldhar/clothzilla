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
import Meta from '../../components/meta/meta.component';

import schema from './login-validation-schema';
import { loginAsync } from '../../redux/auth/auth.actions';
import { selectLoginError } from '../../redux/auth/auth.selectors';

const Login = ({ history, location, login, error }) => {
	const handleSubmit = (values, { setSubmitting }) => {
		const redirect = location.search ? location.search.split('=')[1] : '/';

		login(values)
			.then(() => history.push(redirect))
			.catch(() => setSubmitting(false));
	};

	return (
		<FormContainer title='Sign In with your email and password'>
			<Meta title='ClothZilla | Login' />
			{error && <Message variant='danger'>{error}</Message>}
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

const mapStateToProps = createStructuredSelector({
	error: selectLoginError,
});

const mapDispatchToProps = (dispatch) => ({
	login: (credentials) => dispatch(loginAsync(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
