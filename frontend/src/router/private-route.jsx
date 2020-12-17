import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Loader from '../components/loader/loader.component';
import {
	selectIsAuthenticated,
	selectLoading,
} from '../redux/user/user.selectors';

const PrivateRoute = ({
	component: Component,
	isAuthenticated = false,
	loading = false,
	...otherProps
}) => (
	<Route
		{...otherProps}
		render={(props) => {
			if (loading) {
				return <Loader />;
			} else {
				return isAuthenticated ? <Component {...props} /> : <Redirect to='/' />;
			}
		}}
	/>
);

const mapStateTopProps = createStructuredSelector({
	isAuthenticated: selectIsAuthenticated,
	loading: selectLoading,
});

export default connect(mapStateTopProps)(PrivateRoute);
