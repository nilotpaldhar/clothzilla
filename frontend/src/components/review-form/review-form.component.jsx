import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Form, Button } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router-dom';

import { selectIsAuthenticated } from '../../redux/user/user.selectors';
import styles from './review-form.module.scss';

const ReviewForm = ({ isAuthenticated }) => {
	const [rating, setRating] = useState(0);

	const handleSubmit = (_evt) => {
		_evt.preventDefault();
		console.log(rating);
	};

	const handleStarClick = (nextValue, prevValue, name) => {
		setRating(nextValue);
	};

	return (
		<div className={styles.form}>
			{isAuthenticated ? (
				<>
					<h2>Write your own review</h2>
					<Row>
						<Col xs={12}>
							<Form onSubmit={handleSubmit}>
								<div className={styles.rating}>
									<h3>How do you rate this product?</h3>
									<StarRatingComponent
										name='customer-rating'
										starCount={5}
										value={rating}
										onStarClick={handleStarClick}
									/>
								</div>
								<Form.Group controlId='title'>
									<Form.Label>Title of review:</Form.Label>
									<Form.Control type='text' />
								</Form.Group>
								<Form.Group controlId='body'>
									<Form.Label>
										Body of Review (Maximum 1000 characters):
									</Form.Label>
									<Form.Control as='textarea' rows={4} />
								</Form.Group>
								<Button type='submit' variant='primary'>
									Submit Review
								</Button>
							</Form>
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
});

export default connect(mapStateToProps)(ReviewForm);
