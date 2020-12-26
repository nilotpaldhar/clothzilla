import React from 'react';
import Layout from '../../components/layout/layout.component';
import styles from './not-found.module.scss';

const NotFound = () => {
	return (
		<Layout>
			<div className={styles.notFound}>
				<h1>Oops! 404 Error</h1>
				<p>Sorry, this page is not available</p>
			</div>
		</Layout>
	);
};

export default NotFound;
