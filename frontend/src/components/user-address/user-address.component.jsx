import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Formik, Form } from 'formik';
import { Card, Button, Row, Col } from 'react-bootstrap';

import FormikInput from '../formik-input/formik-input.component';
import Message from '../message/message.component';
import Spinner from '../spinner/spinner.component';
import FormikSelectInput from '../formik-select-input/formik-select-input.component';

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
import { fetchCountries } from '../../redux/country-list/country-list.actions';
import { selectCountries } from '../../redux/country-list/country-list.selectors';

const UserAddress = ({
	fetchAddress,
	fetchCountries,
	updateAddress,
	loading,
	error,
	shippingAddress,
	countries,
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
		fetchCountries();
	}, [fetchAddress, fetchCountries]);

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
									<FormikSelectInput
										id='country'
										label='Country:'
										type='text'
										name='country'
										optionName='Select your country'>
										{countries &&
											countries.map((country) => (
												<option
													key={country.alpha2Code}
													value={country.alpha2Code}>
													{country.name}
												</option>
											))}
									</FormikSelectInput>
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
	countries: selectCountries,
});

const mapDispatchToProps = (dispatch) => ({
	fetchAddress: () => dispatch(fetchUserAddress()),
	updateAddress: (address) => dispatch(updateUserAddress(address)),
	fetchCountries: () => dispatch(fetchCountries()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAddress);
