import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import 'react-toastify/dist/ReactToastify.css';

import { removeNotification } from '../../redux/notification/notification.actions';
import {
	selectNotificationMessage,
	selectNotificationVariant,
} from '../../redux/notification/notification.selectors';

const Notification = ({ removeNotification, message, variant }) => {
	useEffect(() => {
		const notify = (message = '', variant = '') => {
			switch (variant.toLowerCase()) {
				case 'success':
					toast.success(message, { onClose: removeNotification });
					break;
				case 'info':
					toast.info(message, { onClose: removeNotification });
					break;

				case 'warning':
					toast.warning(message, { onClose: removeNotification });
					break;

				case 'error':
					toast.error(message, { onClose: removeNotification });
					break;

				default:
					return;
			}
		};
		notify(message, variant);
	}, [message, variant, removeNotification]);

	return (
		<ToastContainer
			position='bottom-right'
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={true}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			limit={10}
		/>
	);
};

const mapStateToProps = createStructuredSelector({
	message: selectNotificationMessage,
	variant: selectNotificationVariant,
});

const mapDispatchToProps = (dispatch) => ({
	removeNotification: () => dispatch(removeNotification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
