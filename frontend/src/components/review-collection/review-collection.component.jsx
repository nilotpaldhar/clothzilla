import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import ReviewItem from '../review-item/review-item.component';
import Spinner from '../spinner/spinner.component';
import Message from '../message/message.component';

import styles from './review-collection.module.scss';

import { fetchReviews } from '../../redux/review-list/review-list.actions';
import {
	selectLoading,
	selectError,
	selectReviews,
} from '../../redux/review-list/review-list.selectors';

const ReviewCollection = ({
	name,
	loading,
	error,
	reviews,
	limit,
	productId,
	fetchReviews,
}) => {
	const [reviewLimit, setReviewLimit] = useState(limit);
	useEffect(() => {
		if (productId) {
			fetchReviews(productId);
		}
	}, [fetchReviews, productId]);

	return (
		<div className={styles.collection}>
			<Row>
				<Col xs={12}>
					{loading ? (
						<Spinner />
					) : error ? (
						<Message variant='danger'>{error}</Message>
					) : (
						<>
							<h2>{name}</h2>
							{reviews && reviews.length === 0 ? (
								<p className='text-muted'>No reviews yet</p>
							) : (
								<>
									{reviews
										.filter((review, idx) => idx < reviewLimit)
										.map((review) => (
											<ReviewItem key={review._id} review={review} />
										))}
									{reviews.length > reviewLimit && (
										<button onClick={() => setReviewLimit(reviewLimit + limit)}>
											<span>See More</span>
											<FontAwesomeIcon icon={faArrowRight} />
										</button>
									)}
								</>
							)}
						</>
					)}
				</Col>
			</Row>
		</div>
	);
};

ReviewCollection.defaultProps = {
	name: 'Customer Reviews',
	limit: 3,
};

const mapStateToProps = createStructuredSelector({
	loading: selectLoading,
	error: selectError,
	reviews: selectReviews,
});

const mapDispatchToProps = (dispatch) => ({
	fetchReviews: (productId) => dispatch(fetchReviews(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewCollection);
