import { combineReducers } from 'redux';

// Reducers related to authentication and user
import authReducer from './auth/auth.reducer';
import userReducer from './user/user.reducer';

// Reducers related to product
import productListReducer from './product-list/product-list.reducer';
import productDetailsReducer from './product-details/product-details.reducer';

// Reducers related to category
import categoryListReducer from './category-list/category-list.reducer';

const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,

	productList: productListReducer,
	productDetails: productDetailsReducer,

	categoryList: categoryListReducer,
});

export default rootReducer;
