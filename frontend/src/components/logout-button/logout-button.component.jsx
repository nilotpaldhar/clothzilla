import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutAsync } from '../../redux/auth/auth.actions';
import { Reoverlay } from 'reoverlay';

import ConfirmModal from '../confirm-modal/confirm-modal.component';

const LogoutButton = ({ children, className = '', logout }) => {
	const history = useHistory();

	const handleClick = (_evt) => {
		_evt.preventDefault();
		// Display a confirm modal for logout
		Reoverlay.showModal(ConfirmModal, {
			text: 'Are you sure you want to logout?',
			onConfirm: async () => {
				await logout();
				Reoverlay.hideModal();
				history.push('/login');
			},
		});
	};

	return (
		<a href='/logout' className={className} onClick={handleClick}>
			{children}
		</a>
	);
};

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logoutAsync()),
});

export default connect(null, mapDispatchToProps)(LogoutButton);
