import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Formik, Form } from 'formik';
import { Card, Button } from 'react-bootstrap';

import FormikInput from '../formik-input/formik-input.component';
import Spinner from '../spinner/spinner.component';
import Message from '../message/message.component';
import schema from './user-profile-validation-schema';

import {
	fetchUserProfile,
	updateUserProfile,
} from '../../redux/user-profile/user-profile.actions';
import {
	selectUserProfileLoading,
	selectUserProfileError,
	selectUserProfileDetails,
} from '../../redux/user-profile/user-profile.selectors';

const UserProfile = ({
	fetchProfile,
	updateProfile,
	loading,
	error,
	details,
}) => {
	const handleSubmit = (values, { setSubmitting, resetForm }) => {
		updateProfile(values)
			.then(() => {
				setSubmitting(false);
				resetForm();
			})
			.catch(() => {
				setSubmitting(false);
				resetForm();
			});
	};

	useEffect(() => {
		fetchProfile();
	}, [fetchProfile]);

	return (
		<Card>
			<Card.Header as='h1'>Edit Profile</Card.Header>
			<Card.Body>
				{loading ? (
					<Spinner />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<>
						<Formik
							initialValues={{ name: details.name, email: details.email }}
							validationSchema={schema}
							onSubmit={handleSubmit}>
							{(props) => (
								<Form>
									<FormikInput
										id='name'
										label='Name:'
										type='text'
										name='name'
									/>
									<FormikInput
										id='email'
										label='Email:'
										type='email'
										name='email'
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
					</>
				)}
			</Card.Body>
		</Card>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: selectUserProfileLoading,
	error: selectUserProfileError,
	details: selectUserProfileDetails,
});

const mapDispatchToProps = (dispatch) => ({
	fetchProfile: () => dispatch(fetchUserProfile()),
	updateProfile: (details) => dispatch(updateUserProfile(details)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
