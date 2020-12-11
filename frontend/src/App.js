import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ScrollToTop from './components/scroll-to-top/scroll-to-top.component';

import Login from './pages/login/login';
import Register from './pages/register/register';
import Cartpage from './pages/cartpage/cartpage';
import ProductDetails from './pages/product-details/product-details';

import Shipping from './pages/shipping/shipping';
import Payment from './pages/payment/payment';
import PlaceOrder from './pages/place-order/place-order';
import Dashboard from './pages/dashboard/dashboard';
import OrderDetails from './pages/order-details/order-details.component';

import AdminProducts from './pages/admin-products/admin-products';
import AdminProductsEdit from './pages/admin-products-edit/admin-products-edit.component';
import AdminOrders from './pages/admin-orders/admin-orders';
import AdminUsers from './pages/admin-users/admin-users';

import Homepage from './pages/homepage/homepage';

function App() {
	return (
		<ScrollToTop>
			<Switch>
				{/* PUBLIC PAGES */}
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
				<Route path='/cart' component={Cartpage} />
				<Route path='/product/:id' component={ProductDetails} />

				{/* PRIVATE PAGES */}
				<Route path='/shipping' component={Shipping} />
				<Route path='/payment' component={Payment} />
				<Route path='/placeorder' component={PlaceOrder} />
				<Route path='/dashboard' component={Dashboard} />
				<Route path='/order/:id' component={OrderDetails} />

				{/* ADMIN PAGES */}
				<Route path='/admin/products' component={AdminProducts} exact />
				<Route path='/admin/orders' component={AdminOrders} />
				<Route path='/admin/users' component={AdminUsers} />
				<Route path='/admin/products/:id/edit' component={AdminProductsEdit} />

				{/* ROOT */}
				<Route path='/' component={Homepage} exact />
			</Switch>
		</ScrollToTop>
	);
}

export default App;
