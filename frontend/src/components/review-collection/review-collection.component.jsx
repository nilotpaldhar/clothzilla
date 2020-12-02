import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import ReviewItem from '../review-item/review-item.component';
import styles from './review-collection.module.scss';

const ReviewCollection = ({ name, reviews, limit }) => {
	const [reviewLimit, setReviewLimit] = useState(limit);

	return (
		<div className={styles.collection}>
			<Row>
				<Col xs={12}>
					<h2>{name}</h2>
					{reviews
						.filter((review, idx) => idx < reviewLimit)
						.map((review) => (
							<ReviewItem key={review.id} review={review} />
						))}
					{reviews.length > reviewLimit && (
						<button onClick={() => setReviewLimit(reviewLimit + limit)}>
							<span>See More</span>
							<FontAwesomeIcon icon={faArrowRight} />
						</button>
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

export default ReviewCollection;
