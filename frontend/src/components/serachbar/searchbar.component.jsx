import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from './searchbar.module.scss';

const Searchbar = ({ handleClose }) => {
	return (
		<div className={styles.search}>
			<input type='text' placeholder='Search for products' />
			<button type='button' onClick={handleClose}>
				<FontAwesomeIcon icon={faTimes} />
			</button>
		</div>
	);
};

export default Searchbar;
