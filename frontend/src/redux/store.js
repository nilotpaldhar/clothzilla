import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './root-reducer';

const composeEnhancer = true ? composeWithDevTools : compose;

const middlewares = [thunk];

export const store = createStore(
	rootReducer,
	composeEnhancer(applyMiddleware(...middlewares))
);
