import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import Layout from '../../components/layout/layout.component';
import Sidebar from '../../components/sidebar/sidebar.component';
import UserProfile from '../../components/user-profile/user-profile.component';
import UserAddress from '../../components/user-address/user-address.component';
import UserSecurity from '../../components/user-security/user-security.component';
import UserOrders from '../../components/user-orders/user-orders.component';

const Dashboard = ({ match }) => {
	return (
		<Layout>
			<Row>
				<Col xs={12} lg={4} className='mb-4 mb-lg-0'>
					<Sidebar />
				</Col>
				<Col xs={12} lg={8}>
					<Switch>
						<Route exact path={`${match.path}`} component={UserProfile} />
						<Route
							exact
							path={`${match.path}/shipping`}
							component={UserAddress}
						/>
						<Route
							exact
							path={`${match.path}/security`}
							component={UserSecurity}
						/>
						<Route exact path={`${match.path}/orders`} component={UserOrders} />
					</Switch>
				</Col>
			</Row>
		</Layout>
	);
};

export default Dashboard;
