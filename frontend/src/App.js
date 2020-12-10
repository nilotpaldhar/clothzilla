import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Homepage from './pages/homepage/homepage';
import Login from './pages/login/login';
import Register from './pages/register/register';
import ProductDetails from './pages/product-details/product-details';
import Cartpage from './pages/cartpage/cartpage';
import Shipping from './pages/shipping/shipping';
import Payment from './pages/payment/payment';
import PlaceOrder from './pages/place-order/place-order';
import OrderDetails from './pages/order-details/order-details.component';
import Dashboard from './pages/dashboard/dashboard';

function App() {
	return (
		<Switch>
			<Route path='/login' component={Login} />
			<Route path='/register' component={Register} />
			<Route path='/cart' component={Cartpage} />
			<Route path='/shipping' component={Shipping} />
			<Route path='/payment' component={Payment} />
			<Route path='/placeorder' component={PlaceOrder} />
			<Route path='/dashboard' component={Dashboard} />
			<Route path='/product/:id' component={ProductDetails} />
			<Route path='/order/:id' component={OrderDetails} />
			<Route path='/' component={Homepage} exact />
		</Switch>
	);
}

export default App;
