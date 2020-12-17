import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './private-route';
import GuestRoute from './guest-route';
import AdminRoute from './admin-route';

import Login from '../pages/login/login';
import Register from '../pages/register/register';
import Cartpage from '../pages/cartpage/cartpage';
import ProductDetails from '../pages/product-details/product-details';

import Shipping from '../pages/shipping/shipping';
import Payment from '../pages/payment/payment';
import PlaceOrder from '../pages/place-order/place-order';
import Dashboard from '../pages/dashboard/dashboard';
import OrderDetails from '../pages/order-details/order-details.component';

import AdminProducts from '../pages/admin-products/admin-products';
import AdminProductsEdit from '../pages/admin-products-edit/admin-products-edit.component';
import AdminOrders from '../pages/admin-orders/admin-orders';
import AdminUsers from '../pages/admin-users/admin-users';

import Homepage from '../pages/homepage/homepage';

const Routes = () => {
	return (
		<Switch>
			{/* PUBLIC PAGES */}
			<GuestRoute path='/login' component={Login} />
			<GuestRoute path='/register' component={Register} />
			<Route path='/cart' component={Cartpage} />
			<Route path='/product/:id' component={ProductDetails} />

			{/* PRIVATE PAGES */}
			<PrivateRoute path='/shipping' component={Shipping} />
			<PrivateRoute path='/payment' component={Payment} />
			<PrivateRoute path='/placeorder' component={PlaceOrder} />
			<PrivateRoute path='/dashboard' component={Dashboard} />
			<PrivateRoute path='/order/:id' component={OrderDetails} />

			{/* ADMIN PAGES */}
			<AdminRoute path='/admin/products' component={AdminProducts} exact />
			<AdminRoute path='/admin/orders' component={AdminOrders} />
			<AdminRoute path='/admin/users' component={AdminUsers} />
			<AdminRoute
				path='/admin/products/:id/edit'
				component={AdminProductsEdit}
			/>

			{/* ROOT */}
			<Route path='/' component={Homepage} exact />
		</Switch>
	);
};

export default Routes;
