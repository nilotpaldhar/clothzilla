import React from 'react';
import styles from './loader.module.scss';

const Loader = () => {
	return (
		<div className={styles.loader}>
			<div className={styles.body}>
				<div className={styles.inner}></div>
			</div>
		</div>
	);
};

export default Loader;
