import { combineReducers } from 'redux';

// Reducers related to authentication and user
import authReducer from './auth/auth.reducer';
import userReducer from './user/user.reducer';
import userProfileReducer from './user-profile/user-profile.reducer';
import userAddressReducer from './user-address/user-address.reducer';
import userAvatarReducer from './user-avatar/user-avatar.reducer';

// Reducers related to product
import productListReducer from './product-list/product-list.reducer';
import productDetailsReducer from './product-details/product-details.reducer';
import relatedProductReducer from './related-product/related-product.reducer';

// Reducers related to reviews
import reviewListReducer from './review-list/review-list.reducer';

// Reducers related to category
import categoryListReducer from './category-list/category-list.reducer';

// Reducer related to cart
import cartReducer from './cart/cart.reducer';

// Reducer related to notification
import notificationReducer from './notification/notification.reducer';

const rootReducer = combineReducers({
	auth: authReducer,

	categoryList: categoryListReducer,
	cart: cartReducer,

	notification: notificationReducer,

	productList: productListReducer,
	productDetails: productDetailsReducer,

	relatedProduct: relatedProductReducer,
	reviewList: reviewListReducer,

	user: userReducer,
	userAddress: userAddressReducer,
	userAvatar: userAvatarReducer,
	userProfile: userProfileReducer,
});

export default rootReducer;
