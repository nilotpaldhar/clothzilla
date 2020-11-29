import React from 'react';
import styles from './product-filter-item.module.scss';
import cx from 'classnames';

const ProductFilterItem = ({ id, isActive, name, handleClick }) => {
	return (
		<li className={styles.item}>
			<button
				className={cx(styles.btn, { [styles.active]: isActive })}
				value={id}
				onClick={handleClick}>
				{name}
			</button>
		</li>
	);
};

export default ProductFilterItem;
