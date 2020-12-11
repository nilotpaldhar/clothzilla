import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import StarRatingComponent from 'react-star-rating-component';

import styles from './product.module.scss';

const Product = ({ product }) => {
	return (
		<div className={styles.productConatiner}>
			<div className={styles.header}>
				<img src={product.image} alt={product.name} />
				<button className={styles.btn}>
					<FontAwesomeIcon icon={faCartPlus} />
					<span>Add To Cart</span>
				</button>
			</div>

			<div className={styles.body}>
				<a
					href={`/product/${product.id}`}
					target='_blank'
					rel='noopener noreferrer'
					className={styles.name}>
					{product.name}
				</a>
				<div className={styles.pricing}>
					<span className='text-primary'>${product.salePrice}</span>
					<span>
						<del>${product.listPrice}</del>
					</span>
					<span className='text-success'>{product.discount}% Off</span>
				</div>
				<div className={styles.rating}>
					<StarRatingComponent
						name='rate2'
						editing={false}
						starCount={5}
						value={product.rating}
					/>
					<span>({product.reviewCount})</span>
				</div>
			</div>
		</div>
	);
};

export default Product;
