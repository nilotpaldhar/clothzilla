import React from 'react';

import styles from './footer.module.scss';

const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<div>ClothZilla &copy; {year} All rights reserved</div>
		</footer>
	);
};

export default Footer;
