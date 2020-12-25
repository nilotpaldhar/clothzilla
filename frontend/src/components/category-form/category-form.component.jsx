import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Formik, Form } from 'formik';
import { Row, Col, Button } from 'react-bootstrap';

import FormikInput from '../formik-input/formik-input.component';
import schema from './category-form-validation-schema';

import {
	createCategory,
	updateCategory,
} from '../../redux/category-list/category-list.actions';
import {
	selectEditing,
	selectEditCategory,
} from '../../redux/category-list/category-list.selectors';

const CategoryForm = ({
	createCategory,
	editCategory,
	updateCategory,
	editing,
}) => {
	const handleSubmit = (values, { setSubmitting, resetForm }) => {
		const resetFormState = () => {
			setSubmitting(false);
			resetForm();
		};

		if (editing) {
			updateCategory(editCategory._id, values)
				.then(() => resetFormState())
				.catch(() => resetFormState);
		} else {
			createCategory(values)
				.then(() => resetFormState())
				.catch(() => resetFormState);
		}
	};

	return (
		<Formik
			initialValues={{ name: editCategory.name || '' }}
			validationSchema={schema}
			onSubmit={handleSubmit}
			enableReinitialize>
			{({ isSubmitting }) => (
				<Form>
					<Row className='justify-content-end mb-2'>
						<Col className='d-flex justify-content-end align-items-baseline'>
							<FormikInput
								type='text'
								id='name'
								name='name'
								placeholder='Category Name'
								label='Name'
								srOnly
							/>
							<Button
								type='submit'
								className='ml-2 rounded'
								disabled={isSubmitting}>
								{editing ? 'Update' : 'Create'}
							</Button>
						</Col>
					</Row>
				</Form>
			)}
		</Formik>
	);
};

const mapStateToProps = createStructuredSelector({
	editing: selectEditing,
	editCategory: selectEditCategory,
});

const mapDispatchToProps = (dispatch) => ({
	createCategory: (category) => dispatch(createCategory(category)),
	updateCategory: (id, category) => dispatch(updateCategory(id, category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
