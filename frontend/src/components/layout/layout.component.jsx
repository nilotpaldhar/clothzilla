import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import cx from 'classnames';

import Navigation from '../navigation/navigation.component';
import Banner from '../banner/banner.component';
import Footer from '../footer/footer.component';

import styles from './layout.module.scss';

const Layout = ({ children, stickyNav, withBanner }) => {
	return (
		<div className={styles.layout}>
			<Navigation sticky={stickyNav && withBanner} />
			{withBanner && <Banner />}

			<main
				className={cx(styles.content, {
					[styles.xtraPadding]: !withBanner,
				})}>
				<Container>{children}</Container>
			</main>
			<Footer />
		</div>
	);
};

Layout.defaultProps = {
	stickyNav: false,
	withBanner: false,
};

Layout.prototype = {
	stickyNav: PropTypes.bool,
	withBanner: PropTypes.bool,
};

export default Layout;
