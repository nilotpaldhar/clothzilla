import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import StarRatingComponent from 'react-star-rating-component';

import styles from './product.module.scss';

import { addItemToCart } from '../../redux/cart/cart.actions';
import { seletctCartItems } from '../../redux/cart/cart.selectors';
import { existingCartItem } from '../../redux/cart/cart.utils';

const Product = ({ product, addItemToCart, cartItems }) => {
	return (
		<div className={styles.productConatiner}>
			<div className={styles.header}>
				<img src={product.image} alt={product.name} />
				{existingCartItem(cartItems, { product: product._id }) ? (
					<Link to='/cart' className={styles.btn}>
						<FontAwesomeIcon icon={faCartPlus} />
						<span>Go To Cart</span>
					</Link>
				) : (
					<button className={styles.btn} onClick={() => addItemToCart(product)}>
						<FontAwesomeIcon icon={faCartPlus} />
						<span>Add To Cart</span>
					</button>
				)}
			</div>

			<div className={styles.body}>
				<Link
					to={`/product/${product.slug}/${product._id}`}
					className={styles.name}>
					{product.name}
				</Link>
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

const mapStateToProps = createStructuredSelector({
	cartItems: seletctCartItems,
});

const mapDispatchToProps = (dispatch) => ({
	addItemToCart: (product) => dispatch(addItemToCart(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
