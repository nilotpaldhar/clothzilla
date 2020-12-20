import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import styles from './product-quantity.module.scss';

import {
	addItemToCart,
	removeItemFromCart,
} from '../../redux/cart/cart.actions';

const ProductQuantity = ({ product, addItem, removeItem }) => {
	return (
		<div className={styles.container}>
			<button
				type='buton'
				className={styles.btn}
				onClick={() => removeItem(product)}>
				<FontAwesomeIcon icon={faMinus} />
			</button>
			<input
				type='number'
				value={product.quantity}
				disabled
				className={styles.input}
			/>
			<button
				type='buton'
				className={styles.btn}
				onClick={() => addItem(product)}
				disabled={product.quantity === product.stock}>
				<FontAwesomeIcon icon={faPlus} />
			</button>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	addItem: (product) => dispatch(addItemToCart(product)),
	removeItem: (product) => dispatch(removeItemFromCart(product)),
});

export default connect(null, mapDispatchToProps)(ProductQuantity);
