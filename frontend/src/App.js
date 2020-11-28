import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Homepage from './pages/homepage/homepage';
import Login from './pages/login/login';
import Register from './pages/register/register';

function App() {
	return (
		<Switch>
			<Route path='/login' component={Login} />
			<Route path='/register' component={Register} />
			<Route path='/' component={Homepage} exact />
		</Switch>
	);
}

export default App;
