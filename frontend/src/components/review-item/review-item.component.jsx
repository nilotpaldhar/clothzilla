import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import ShowMoreText from 'react-show-more-text';

import styles from './review-item.module.scss';

const ReviewItem = ({ review }) => {
	return (
		<div className={styles.container}>
			<div className={styles.rating}>
				<StarRatingComponent
					name='review-star-rating'
					editing={false}
					starCount={5}
					value={review.rating}
				/>
			</div>
			<h3>{review.title}</h3>
			<div className={styles.details}>
				{review.name} on {review.reviewedAt}
			</div>
			{/* <p>{review.text}</p> */}
			<ShowMoreText
				lines={2}
				className={styles.text}
				more='Read more'
				less='Read less'>
				{review.text}
			</ShowMoreText>
		</div>
	);
};

export default ReviewItem;
