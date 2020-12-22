import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import ShowMoreText from 'react-show-more-text';
import { format } from 'date-fns';

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
				<span>{review.user.name} on </span>
				<span>
					{review.createdAt &&
						format(new Date(review.createdAt), 'MMM dd, yyyy')}
				</span>
			</div>
			<ShowMoreText
				lines={2}
				className={styles.text}
				more='Read more'
				less='Read less'>
				{review.comment}
			</ShowMoreText>
		</div>
	);
};

export default ReviewItem;
