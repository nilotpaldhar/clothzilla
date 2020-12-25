import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Formik, Form } from 'formik';
import { Row, Button, Col, FormCheck } from 'react-bootstrap';

import FormikInput from '../formik-input/formik-input.component';
import FormikSelectInput from '../formik-select-input/formik-select-input.component';
import schema from './product-edit-form-validation-schema';

import { fetchCategories } from '../../redux/category-list/category-list.actions';
import { selectCategories } from '../../redux/category-list/category-list.selectors';

import { updateProduct } from '../../redux/admin-product-update/admin-product-update.actions';

const ProductEditForm = ({
	fetchCategories,
	updateProduct,
	productDetails,
	categories,
}) => {
	const handleSubmit = (values, { setSubmitting }) => {
		updateProduct(productDetails._id, values)
			.then(() => {
				setSubmitting(false);
			})
			.catch(() => {
				setSubmitting(false);
			});
	};

	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	return (
		<Formik
			initialValues={{
				name: productDetails.name || '',
				description: productDetails.description || '',
				listPrice: productDetails.listPrice,
				discount: productDetails.discount,
				stock: productDetails.stock,
				tax: productDetails.tax,
				category: productDetails.category || '',
				isPublished: productDetails.isPublished || false,
			}}
			validationSchema={schema}
			onSubmit={handleSubmit}>
			{(props) => (
				<Form>
					<FormikInput type='text' name='name' id='name' label='Name:' />
					<Row>
						<Col lg={6}>
							<FormikInput
								type='number'
								name='listPrice'
								id='listPrice'
								label='Price:'
								min='0'
								step='.01'
							/>
						</Col>
						<Col lg={6}>
							<FormikInput
								type='number'
								name='discount'
								id='discount'
								label='Discount(%):'
								min='0'
								max='100'
								step='.01'
							/>
						</Col>
					</Row>
					<Row>
						<Col lg={6}>
							<FormikInput
								type='number'
								name='stock'
								id='stock'
								label='Stock:'
								min='0'
							/>
						</Col>
						<Col lg={6}>
							<FormikInput
								type='number'
								name='tax'
								id='tax'
								label='Tax(%):'
								min='0'
								step='.01'
							/>
						</Col>
					</Row>
					<FormikSelectInput
						id='category'
						label='Category:'
						name='category'
						optionName='Select product category'>
						{categories.map(({ _id, name }) => (
							<option key={_id} value={_id}>
								{name}
							</option>
						))}
					</FormikSelectInput>
					<FormikInput
						as='textarea'
						name='description'
						id='description'
						label='Description:'
						rows='8'
					/>
					<Row className='align-items-center'>
						<Col>
							<FormCheck
								type='switch'
								id='isPublished'
								checked={props.values.isPublished}
								name='isPublished'
								label='Published'
								onChange={props.handleChange}
							/>
						</Col>
						<Col>
							<Button
								type='submit'
								variant='primary'
								className='d-block ml-auto px-4 py-2'
								disabled={props.isSubmitting}>
								{props.isSubmitting ? 'Saving' : 'Save'}
							</Button>
						</Col>
					</Row>
				</Form>
			)}
		</Formik>
	);
};

const mapStateToProps = createStructuredSelector({
	categories: selectCategories,
});

const mapDispatchToProps = (dispatch) => ({
	fetchCategories: () => dispatch(fetchCategories()),
	updateProduct: (id, product) => dispatch(updateProduct(id, product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductEditForm);
