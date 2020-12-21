import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Formik, Form } from 'formik';
import { Card, Button, Row, Col } from 'react-bootstrap';

import FormikInput from '../formik-input/formik-input.component';
import Message from '../message/message.component';
import Spinner from '../spinner/spinner.component';
import schema from './user-address-validation-schema';

import {
	fetchUserAddress,
	updateUserAddress,
} from '../../redux/user-address/user-address.actions';
import {
	selectAddressLoading,
	selectAddressError,
	selectAddress,
} from '../../redux/user-address/user-address.selectors';

const UserAddress = ({
	fetchAddress,
	updateAddress,
	loading,
	error,
	shippingAddress,
}) => {
	const handleSubmit = (values, { setSubmitting, resetForm }) => {
		updateAddress(values)
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
		fetchAddress();
	}, [fetchAddress]);

	return (
		<Card>
			<Card.Header as='h1'>Edit Shipping Address</Card.Header>
			<Card.Body>
				{loading ? (
					<Spinner />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<>
						<Formik
							initialValues={{
								address: shippingAddress.address || '',
								city: shippingAddress.city || '',
								postalCode: shippingAddress.postalCode,
								country: shippingAddress.country || '',
							}}
							validationSchema={schema}
							onSubmit={handleSubmit}>
							{(props) => (
								<Form>
									<FormikInput
										id='address'
										label='Address:'
										type='text'
										name='address'
									/>
									<Row>
										<Col xs={12} md={6}>
											<FormikInput
												id='city'
												label='Town / City:'
												type='text'
												name='city'
											/>
										</Col>
										<Col xs={12} md={6}>
											<FormikInput
												id='postalCode'
												label='Postcode / ZIP:'
												type='number'
												name='postalCode'
											/>
										</Col>
									</Row>
									<FormikInput
										id='country'
										label='Country:'
										type='text'
										name='country'
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
	loading: selectAddressLoading,
	error: selectAddressError,
	shippingAddress: selectAddress,
});

const mapDispatchToProps = (dispatch) => ({
	fetchAddress: () => dispatch(fetchUserAddress()),
	updateAddress: (address) => dispatch(updateUserAddress(address)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAddress);
