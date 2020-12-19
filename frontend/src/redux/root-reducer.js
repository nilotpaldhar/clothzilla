import { combineReducers } from 'redux';

// Reducers related to authentication and user
import authReducer from './auth/auth.reducer';
import userReducer from './user/user.reducer';

// Reducers related to product
import productListReducer from './product-list/product-list.reducer';
import productDetailsReducer from './product-details/product-details.reducer';
import relatedProductReducer from './related-product/related-product.reducer';

// Reducers related to reviews
import reviewListReducer from './review-list/review-list.reducer';

// Reducers related to category
import categoryListReducer from './category-list/category-list.reducer';

const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,

	productList: productListReducer,
	productDetails: productDetailsReducer,
	relatedProduct: relatedProductReducer,

	reviewList: reviewListReducer,

	categoryList: categoryListReducer,
});

export default rootReducer;
