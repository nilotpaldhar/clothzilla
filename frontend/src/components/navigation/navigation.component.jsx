import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUserPlus,
	faSignInAlt,
	faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';

import { ReactComponent as Logo } from '../../assets/logo/logo.svg';
import styles from './navigation.module.scss';

const Navigation = ({ sticky }) => {
	const [scrolled, setScrolled] = useState(false);
	const handleScroll = () => {
		const offset = window.scrollY;
		offset > 50 ? setScrolled(true) : setScrolled(false);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
	});

	return (
		<Navbar
			className={cx(styles.navigation, {
				[styles.stickyNav]: sticky && !scrolled,
				[styles.fixedNav]: !sticky,
				[styles.scrolled]: sticky && scrolled,
			})}
			bg='custom'
			variant='dark'
			fixed='top'
			expand='lg'>
			<Container>
				<Navbar.Brand href='#home'>
					<Logo />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='navbar-nav' />
				<Navbar.Collapse id='navbar-nav'>
					<Nav className='ml-auto'>
						<Nav.Link href='#cart' className={styles.navLink}>
							<FontAwesomeIcon icon={faShoppingCart} />
							<span className='ml-2'>Cart(4)</span>
						</Nav.Link>

						<LinkContainer to='/login'>
							<Nav.Link className={styles.navLink}>
								<FontAwesomeIcon icon={faSignInAlt} />
								<span className='ml-2'>Login</span>
							</Nav.Link>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;
