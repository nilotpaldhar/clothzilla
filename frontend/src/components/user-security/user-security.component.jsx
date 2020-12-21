import React from 'react';
import { Formik, Form } from 'formik';
import { Card, Button } from 'react-bootstrap';

import FormikInput from '../formik-input/formik-input.component';
import schema from './user-security-validation-schema';

const UserSecurity = () => {
	const handleSubmit = (values, { setSubmitting, resetForm }) => {
		console.log(values);
		setTimeout(() => {
			setSubmitting(false);
			resetForm();
		}, 3000);
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

export default UserSecurity;
