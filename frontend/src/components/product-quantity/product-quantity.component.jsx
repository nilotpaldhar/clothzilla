import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import styles from './product-quantity.module.scss';

const ProductQuantity = () => {
	return (
		<div className={styles.container}>
			<button type='buuton' className={styles.btn}>
				<FontAwesomeIcon icon={faMinus} />
			</button>
			<input type='number' value={5} disabled className={styles.input} />
			<button type='buuton' className={styles.btn}>
				<FontAwesomeIcon icon={faPlus} />
			</button>
		</div>
	);
};

export default ProductQuantity;
