import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { NavLink } from 'react-router-dom';
import CircleSpinner from 'react-spinkit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUser,
	faAddressBook,
	faLock,
	faShoppingBasket,
	faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

import LogoutButton from '../logout-button/logout-button.component';

import styles from './sidebar.module.scss';

import { selectUserDetails } from '../../redux/user/user.selectors';
import { fetchAvatar } from '../../redux/user-avatar/user-avatar.actions';
import {
	selectAvatarLoading,
	selectAvatarError,
	selectAvatarUrl,
} from '../../redux/user-avatar/user-avatar.selectors';

const Sidebar = ({ userDetails, fetchAvatar, loading, error, avatarUrl }) => {
	useEffect(() => {
		fetchAvatar();
	}, [fetchAvatar]);

	return (
		<aside className={styles.sidebar}>
			<div className={styles.header}>
				<div className={styles.imgBox}>
					{loading ? (
						<CircleSpinner name='circle' color='#333' />
					) : (
						!error && <img src={avatarUrl} alt={userDetails.name} />
					)}
				</div>
				<div className={styles.name}>{userDetails.name}</div>
			</div>
			<nav className={styles.nav}>
				<NavLink to='/dashboard' exact>
					<FontAwesomeIcon icon={faUser} />
					<span className='ml-3'>Profile</span>
				</NavLink>
				<NavLink to='/dashboard/shipping' exact>
					<FontAwesomeIcon icon={faAddressBook} />
					<span className='ml-3'>Shipping Address</span>
				</NavLink>
				<NavLink to='/dashboard/security' exact>
					<FontAwesomeIcon icon={faLock} />
					<span className='ml-3'>Security</span>
				</NavLink>
				<NavLink to='/dashboard/orders' exact>
					<FontAwesomeIcon icon={faShoppingBasket} />
					<span className='ml-3'>Orders</span>
				</NavLink>

				<LogoutButton>
					<FontAwesomeIcon icon={faSignOutAlt} />
					<span className='ml-3'>Logout</span>
				</LogoutButton>
			</nav>
		</aside>
	);
};

const mapStateToProps = createStructuredSelector({
	userDetails: selectUserDetails,
	loading: selectAvatarLoading,
	error: selectAvatarError,
	avatarUrl: selectAvatarUrl,
});

const mapDispatchToProps = (dispatch) => ({
	fetchAvatar: () => dispatch(fetchAvatar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
