import React from 'react';
import ReactSpinner from 'react-spinkit';

import styles from './spinner.module.scss';

const Spinner = ({ color = '#333333' }) => {
	return (
		<div className={styles.container}>
			<ReactSpinner name='line-scale-pulse-out' color={color} />
		</div>
	);
};

export default Spinner;
