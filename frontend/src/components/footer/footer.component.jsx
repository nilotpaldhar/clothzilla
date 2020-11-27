import React from 'react';

import styles from './footer.module.scss';

const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<div>
				Copyright &copy; {year} All rights reserved | This website is made by
				<a
					target='_blank'
					rel='noopener noreferrer'
					href='https://www.nilotpaldhar.com/'>
					Nilotpal Dhar
				</a>
			</div>
		</footer>
	);
};

export default Footer;
