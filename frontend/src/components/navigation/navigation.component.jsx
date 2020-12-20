import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';

import Searchbar from '../searchbar/searchbar.component';
import LogoutButton from '../logout-button/logout-button.component';

import { ReactComponent as Logo } from '../../assets/logo/logo.svg';
import styles from './navigation.module.scss';

import {
	selectIsAuthenticated,
	selectIsAdmin,
	selectUserDetails,
} from '../../redux/user/user.selectors';
import { seletctCartItemsCount } from '../../redux/cart/cart.selectors';

const Navigation = ({
	sticky,
	isAuthenticated,
	isAdmin,
	user,
	cartItemsCount,
}) => {
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
						<Navbar.Toggle aria-controls='navbar-nav' />
						<LinkContainer to='/'>
							<Navbar.Brand>
								<Logo />
							</Navbar.Brand>
						</LinkContainer>
						<Nav className='d-lg-none'>
							<Nav.Link
								href='#'
								className={styles.navLink}
								onClick={() => setSearch(true)}>
								<FontAwesomeIcon icon={faSearch} />
							</Nav.Link>
						</Nav>

						<Navbar.Collapse id='navbar-nav'>
							<Nav className='ml-auto py-3 py-lg-0'>
								<Nav.Link
									href='#'
									className={`d-none d-lg-block ${styles.navLink}`}
									onClick={() => setSearch(true)}>
									<FontAwesomeIcon icon={faSearch} />
								</Nav.Link>
								<LinkContainer to='/cart'>
									<Nav.Link className={styles.navLink}>
										Cart({cartItemsCount})
									</Nav.Link>
								</LinkContainer>

								{isAuthenticated ? (
									<NavDropdown
										title={user.name}
										id='user-dashboard'
										className={styles.navLink}>
										<LinkContainer to='/dashboard'>
											<NavDropdown.Item>Dashboard</NavDropdown.Item>
										</LinkContainer>
										<NavDropdown.Divider />
										<LogoutButton className='dropdown-item'>
											Logout
										</LogoutButton>
									</NavDropdown>
								) : (
									<LinkContainer to='/login'>
										<Nav.Link className={styles.navLink}>Login</Nav.Link>
									</LinkContainer>
								)}

								{isAdmin && (
									<NavDropdown
										title='Admin'
										id='admin-dashboard'
										className={styles.navLink}>
										<LinkContainer exact to='/admin/products'>
											<NavDropdown.Item>Products</NavDropdown.Item>
										</LinkContainer>
										<NavDropdown.Divider />
										<LinkContainer to='/admin/orders'>
											<NavDropdown.Item>Orders</NavDropdown.Item>
										</LinkContainer>
										<NavDropdown.Divider />
										<LinkContainer to='/admin/users'>
											<NavDropdown.Item>Users</NavDropdown.Item>
										</LinkContainer>
									</NavDropdown>
								)}
							</Nav>
						</Navbar.Collapse>
					</>
				)}
			</Container>
		</Navbar>
	);
};

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectIsAuthenticated,
	isAdmin: selectIsAdmin,
	user: selectUserDetails,
	cartItemsCount: seletctCartItemsCount,
});

export default connect(mapStateToProps)(Navigation);
