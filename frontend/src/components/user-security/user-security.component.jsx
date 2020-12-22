import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { Card, Button } from 'react-bootstrap';

import FormikInput from '../formik-input/formik-input.component';
import schema from './user-security-validation-schema';

import { updatePasswordAsync } from '../../redux/auth/auth.actions';

const UserSecurity = ({ updatePassword }) => {
	const handleSubmit = (values, { setSubmitting, resetForm }) => {
		updatePassword(values)
			.then(() => {
				setSubmitting(false);
				resetForm();
			})
			.catch(() => {
				setSubmitting(false);
				resetForm();
			});
	};

	return (
		<Card>
			<Card.Header as='h1'>Edit Security Details</Card.Header>
			<Card.Body>
				<Formik
					initialValues={{
						currentPassword: '',
						newPassword: '',
						passwordConfirmation: '',
					}}
					validationSchema={schema}
					onSubmit={handleSubmit}>
					{(props) => (
						<Form>
							<FormikInput
								id='currentPassword'
								label='Current Password:'
								type='password'
								name='currentPassword'
							/>
							<FormikInput
								id='newPassword'
								label='New Password:'
								type='password'
								name='newPassword'
								placeholder='New Password'
							/>
							<FormikInput
								id='passwordConfirmation'
								label='Confirm Password:'
								srOnly
								type='password'
								name='passwordConfirmation'
								placeholder='Confirm Password'
							/>
							<Button
								type='submit'
								variant='primary'
								className='px-4 py-2'
								disabled={props.isSubmitting}>
								{props.isSubmitting ? 'Saving' : 'Save'}
							</Button>
						</Form>
					)}
				</Formik>
			</Card.Body>
		</Card>
	);
};

const mapDispatchToProps = (dispatch) => ({
	updatePassword: (passwords) => dispatch(updatePasswordAsync(passwords)),
});

export default connect(null, mapDispatchToProps)(UserSecurity);
