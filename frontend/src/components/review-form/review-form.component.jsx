import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Formik, Form } from 'formik';
import { Row, Col, Button } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
import { toast } from 'react-toastify';

import FormikInput from '../formik-input/formik-input.component';

import { selectIsAuthenticated } from '../../redux/user/user.selectors';
import { selectProduct } from '../../redux/product-details/product-details.selectors';
import { createReview } from '../../redux/review-list/review-list.actions';

import schema from './review-form-validation-schema';

import styles from './review-form.module.scss';

const ReviewForm = ({ isAuthenticated, product, createReview }) => {
	const [rating, setRating] = useState(0);

	const handleSubmit = (values, { setSubmitting, resetForm }) => {
		if (rating === 0) {
			toast.error('Please enter your rating');
			setSubmitting(false);
		} else {
			createReview(product._id, { ...values, rating })
				.then(() => {
					setSubmitting(false);
					resetForm();
					setRating(0);
					toast.success('Review added successfully');
				})
				.catch((error) => {
					setSubmitting(false);
					resetForm();
					setRating(0);
					toast.error(error);
				});
		}
	};

	const handleStarClick = (nextValue) => {
		setRating(nextValue);
	};

	return (
		<div className={styles.form}>
			{isAuthenticated ? (
				<>
					<h2>Write your own review</h2>
					<Row>
						<Col xs={12}>
							<Formik
								initialValues={{
									title: '',
									comment: '',
								}}
								validationSchema={schema}
								onSubmit={handleSubmit}>
								{(props) => (
									<Form>
										<div className={styles.rating}>
											<h3>How do you rate this product?</h3>
											<StarRatingComponent
												name='rating'
												starCount={5}
												value={rating}
												onStarClick={handleStarClick}
											/>
										</div>

										<FormikInput
											id='title'
											label='Title of review:'
											type='text'
											name='title'
										/>

										<FormikInput
											id='comment'
											label='Comment:'
											type='text'
											name='comment'
										/>

										<Button
											type='submit'
											variant='primary'
											disabled={props.isSubmitting}>
											{props.isSubmitting ? 'Submitting' : 'Submit Review'}
										</Button>
									</Form>
								)}
							</Formik>
						</Col>
					</Row>
				</>
			) : (
				<h2 className='text-capitalize'>Please login to write review</h2>
			)}
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectIsAuthenticated,
	product: selectProduct,
});

const mapDispatchToProps = (dispatch) => ({
	createReview: (productId, review) =>
		dispatch(createReview(productId, review)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
