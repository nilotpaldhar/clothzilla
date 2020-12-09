import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Homepage from './pages/homepage/homepage';
import Login from './pages/login/login';
import Register from './pages/register/register';
import ProductDetails from './pages/product-details/product-details';
import Cartpage from './pages/cartpage/cartpage';

function App() {
	return (
		<Switch>
			<Route path='/login' component={Login} />
			<Route path='/register' component={Register} />
			<Route path='/cart' component={Cartpage} />
			<Route path='/product/:id' component={ProductDetails} />
			<Route path='/' component={Homepage} exact />
		</Switch>
	);
}

export default App;
