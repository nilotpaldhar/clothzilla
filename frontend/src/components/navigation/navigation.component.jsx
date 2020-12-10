import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';

import Searchbar from '../../components/serachbar/searchbar.component';

import { ReactComponent as Logo } from '../../assets/logo/logo.svg';
import styles from './navigation.module.scss';

const Navigation = ({ sticky }) => {
	const [scrolled, setScrolled] = useState(false);
	const [showSeach, setSearch] = useState(false);

	const handleScroll = () => {
		const offset = window.scrollY;
		offset > 50 ? setScrolled(true) : setScrolled(false);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [scrolled]);

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
				{showSeach ? (
					<Searchbar handleClose={() => setSearch(false)} />
				) : (
					<>
						<LinkContainer to='/'>
							<Navbar.Brand>
								<Logo />
							</Navbar.Brand>
						</LinkContainer>
						<Navbar.Toggle aria-controls='navbar-nav' />
						<Navbar.Collapse id='navbar-nav'>
							<Nav className='ml-auto'>
								<Nav.Link
									href='#'
									className={styles.navLink}
									onClick={() => setSearch(true)}>
									<FontAwesomeIcon icon={faSearch} />
								</Nav.Link>

								<LinkContainer to='/login'>
									<Nav.Link className={styles.navLink}>Login</Nav.Link>
								</LinkContainer>

								<Nav.Link href='#cart' className={styles.navLink}>
									Cart(4)
								</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</>
				)}
			</Container>
		</Navbar>
	);
};

export default Navigation;
