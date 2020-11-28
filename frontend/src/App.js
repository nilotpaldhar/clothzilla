import React from 'react';
import { Switch, Route } from 'react-router-dom';

function App() {
	return (
		<Switch>
			<Route path='/' render={() => <h1>Home</h1>} exact />
		</Switch>
	);
}

export default App;
