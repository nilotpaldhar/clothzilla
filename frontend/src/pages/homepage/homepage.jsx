import React from 'react';
import Layout from '../../components/layout/layout.component';
import styles from './homepage.module.scss';

const homepage = () => {
	return (
		<Layout withBanner stickyNav>
			<h1>Home Page</h1>
		</Layout>
	);
};

export default homepage;
