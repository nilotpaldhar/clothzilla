import React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
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

export default Notification;
