import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './private-route';
import GuestRoute from './guest-route';
import AdminRoute from './admin-route';
import Loader from '../components/loader/loader.component';

const Login = lazy(() => import('../pages/login/login'));
const Register = lazy(() => import('../pages/register/register'));
const Cartpage = lazy(() => import('../pages/cartpage/cartpage'));
const ProductDetails = lazy(() =>
	import('../pages/product-details/product-details')
);

const Shipping = lazy(() => import('../pages/shipping/shipping'));
const Payment = lazy(() => import('../pages/payment/payment'));
const PlaceOrder = lazy(() => import('../pages/place-order/place-order'));
const Dashboard = lazy(() => import('../pages/dashboard/dashboard'));
const OrderDetails = lazy(() =>
	import('../pages/order-details/order-details.component')
);

const AdminProducts = lazy(() =>
	import('../pages/admin-products/admin-products')
);
const AdminProductsEdit = lazy(() =>
	import('../pages/admin-products-edit/admin-products-edit.component')
);
const AdminOrders = lazy(() => import('../pages/admin-orders/admin-orders'));
const AdminOrderDetails = lazy(() =>
	import('../pages/admin-order-details/admin-order-details')
);
const AdminUsers = lazy(() => import('../pages/admin-users/admin-users'));
const AdminCategories = lazy(() =>
	import('../pages/admin-categories/admin-categories')
);

const Homepage = lazy(() => import('../pages/homepage/homepage'));

const NotFound = lazy(() => import('../pages/not-found/not-found'));

const Routes = () => {
	return (
		<Suspense fallback={<Loader />}>
			<Switch>
				{/* PUBLIC PAGES */}
				<GuestRoute path='/login' component={Login} />
				<GuestRoute path='/register' component={Register} />
				<Route path='/cart' component={Cartpage} />
				<Route path='/product/:slug/:id' component={ProductDetails} />

				{/* PRIVATE PAGES */}
				<PrivateRoute path='/shipping' component={Shipping} />
				<PrivateRoute path='/payment' component={Payment} />
				<PrivateRoute path='/placeorder' component={PlaceOrder} />
				<PrivateRoute path='/dashboard' component={Dashboard} />
				<PrivateRoute path='/order/:id' component={OrderDetails} />

				{/* ADMIN PAGES */}
				<AdminRoute path='/admin/users' component={AdminUsers} />
				<AdminRoute path='/admin/categories' component={AdminCategories} />
				<AdminRoute
					path='/admin/products/:id/edit'
					component={AdminProductsEdit}
				/>
				<AdminRoute path='/admin/products' component={AdminProducts} exact />

				<AdminRoute path='/admin/orders/:id' component={AdminOrderDetails} />
				<AdminRoute path='/admin/orders' component={AdminOrders} />

				{/* ROOT */}
				<Route path='/' component={Homepage} exact />

				{/* 404 Page */}
				<Route exact path='*' component={NotFound} />
			</Switch>
		</Suspense>
	);
};

export default Routes;
