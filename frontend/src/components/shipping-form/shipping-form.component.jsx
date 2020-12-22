import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Formik, Form } from 'formik';
import { Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import FormikInput from '../formik-input/formik-input.component';
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

const ShippingForm = ({
	fetchAddress,
	saveShippingAddress,
	loading,
	error,
	userAddress,
	userDetails,
}) => {
	const history = useHistory();

	const handleSubmit = (values) => {
		saveShippingAddress(values);
		history.push('/payment');
	};

	useEffect(() => {
		fetchAddress();
	}, [fetchAddress]);

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
							<FormikInput
								id='country'
								label='Country:'
								type='text'
								name='country'
							/>
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
});

const mapDispatchToProps = (dispatch) => ({
	fetchAddress: () => dispatch(fetchUserAddress()),
	saveShippingAddress: (address) => dispatch(saveShippingAddress(address)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShippingForm);
