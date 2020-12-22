import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './root-reducer';

const composeEnhancer =
	process.env.NODE_ENV === 'development' ? composeWithDevTools : compose;

const middlewares = [thunk];

export const store = createStore(
	rootReducer,
	composeEnhancer(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);
