import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ModalContainer } from 'reoverlay';

import ScrollToTop from './components/scroll-to-top/scroll-to-top.component';
import Routes from './router/routes';
import Loader from './components/loader/loader.component';
import Meta from './components/meta/meta.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import Notification from './components/notification/notification.component';

import { loadUserAsync } from './redux/user/user.actions';

const App = ({ loadUser }) => {
	const [renderApp, setRenderApp] = useState(false);

	// Checking if user is authenticated or not before app render
	useEffect(() => {
		const checkUserStatus = async () => {
			try {
				await loadUser();
				setRenderApp(true);
			} catch (error) {
				setRenderApp(true);
			}
		};
		checkUserStatus();
	}, [loadUser, renderApp]);

	if (!renderApp) {
		return <Loader />;
	}

	return (
		<ErrorBoundary>
			<ScrollToTop>
				<Meta />
				<Routes />
				<ModalContainer />
				<Notification />
			</ScrollToTop>
		</ErrorBoundary>
	);
};

const mapDispatchToProps = (dispatch) => ({
	loadUser: () => dispatch(loadUserAsync()),
});

export default connect(null, mapDispatchToProps)(App);
