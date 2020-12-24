import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Formik, Form } from 'formik';
import { Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import FormikInput from '../formik-input/formik-input.component';
import FormikSelectInput from '../formik-select-input/formik-select-input.component';
import Spinner from '../spinner/spinner.component';
import Message from '../message/message.component';
import schema from './shipping-form-validation-schema';

import { fetchUserAddress } from '../../redux/user-address/user-address.actions';
import { saveShippingAddress } from '../../redux/cart/cart.actions';

import { selectUserDetails } from '../../redux/user/user.selectors';
import {
	selectAddressLoading,
	selectAddressError,
	selectAddress,
} from '../../redux/user-address/user-address.selectors';

import { fetchCountries } from '../../redux/country-list/country-list.actions';
import { selectCountries } from '../../redux/country-list/country-list.selectors';

const ShippingForm = ({
	fetchAddress,
	fetchCountries,
	saveShippingAddress,
	loading,
	error,
	userAddress,
	userDetails,
	countries,
}) => {
	const history = useHistory();

	const handleSubmit = (values) => {
		saveShippingAddress(values);
		history.push('/payment');
	};

	useEffect(() => {
		fetchAddress();
		fetchCountries();
	}, [fetchAddress, fetchCountries]);

	return (
		<>
			{loading ? (
				<Spinner />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Formik
					initialValues={{
						name: userDetails.name || '',
						email: userDetails.email || '',
						address: userAddress.address || '',
						city: userAddress.city || '',
						postalCode: userAddress.postalCode,
						country: userAddress.country || '',
					}}
					validationSchema={schema}
					onSubmit={handleSubmit}>
					{() => (
						<Form>
							<Row>
								<Col md={6}>
									<FormikInput
										name='name'
										id='name'
										label='Name:'
										type='text'
									/>
								</Col>
								<Col md={6}>
									<FormikInput
										name='email'
										id='email'
										label='Email:'
										type='email'
									/>
								</Col>
							</Row>
							<FormikInput
								id='address'
								label='Address:'
								type='text'
								name='address'
							/>
							<Row>
								<Col md={6}>
									<FormikInput
										id='city'
										label='Town / City:'
										type='text'
										name='city'
									/>
								</Col>
								<Col md={6}>
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
								optionName='Select your contry'>
								{countries &&
									countries.map((country) => (
										<option key={country.alpha2Code} value={country.alpha2Code}>
											{country.name}
										</option>
									))}
							</FormikSelectInput>
							<Button type='submit' variant='primary' className='px-4 py-2'>
								Next
							</Button>
						</Form>
					)}
				</Formik>
			)}
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: selectAddressLoading,
	error: selectAddressError,
	userAddress: selectAddress,
	userDetails: selectUserDetails,
	countries: selectCountries,
});

const mapDispatchToProps = (dispatch) => ({
	fetchAddress: () => dispatch(fetchUserAddress()),
	saveShippingAddress: (address) => dispatch(saveShippingAddress(address)),
	fetchCountries: () => dispatch(fetchCountries()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShippingForm);
