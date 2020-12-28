import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Loader from '../components/loader/loader.component';
import Meta from '../components/meta/meta.component';
import { selectIsAdmin, selectLoading } from '../redux/user/user.selectors';

const AdminRoute = ({
	component: Component,
	isAdmin = false,
	loading = false,
	...otherProps
}) => (
	<Route
		{...otherProps}
		render={(props) => {
			if (loading) {
				return <Loader />;
			} else {
				return isAdmin ? (
					<>
						<Meta title='ClothZilla | Admin Dashboard ' />
						<Component {...props} />
					</>
				) : (
					<Redirect to='/' />
				);
			}
		}}
	/>
);

const mapStateTopProps = createStructuredSelector({
	isAdmin: selectIsAdmin,
	loading: selectLoading,
});

export default connect(mapStateTopProps)(AdminRoute);
