import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUser,
	faAddressBook,
	faLock,
	faShoppingBasket,
	faUsers,
	faThList,
	faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

import styles from './sidebar.module.scss';
import imgSrc from '../../assets/images/user.jpg';

const Sidebar = ({ isAdmin, isUser }) => {
	return (
		<aside className={styles.sidebar}>
			<div className={styles.header}>
				<div className={styles.imgBox}>
					<img src={imgSrc} alt='avatar' />
				</div>
				<div className={styles.name}>John Doe</div>
			</div>
			<nav className={styles.nav}>
				{isUser && (
					<>
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
					</>
				)}

				{isAdmin && (
					<>
						<NavLink to='/dashboard/products' exact>
							<FontAwesomeIcon icon={faThList} />
							<span className='ml-3'>Products</span>
						</NavLink>
						<NavLink to='/admin/orders' exact>
							<FontAwesomeIcon icon={faShoppingBasket} />
							<span className='ml-3'>Orders</span>
						</NavLink>
						<NavLink to='/admin/users' exact>
							<FontAwesomeIcon icon={faUsers} />
							<span className='ml-3'>Users</span>
						</NavLink>
					</>
				)}
				<NavLink to='/login'>
					<FontAwesomeIcon icon={faSignOutAlt} />
					<span className='ml-3'>Logout</span>
				</NavLink>
			</nav>
		</aside>
	);
};

export default Sidebar;
