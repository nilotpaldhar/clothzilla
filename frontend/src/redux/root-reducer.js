import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

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

// Reducer related to orders
import orderListReducer from './order-list/order-list.reducer';
import orderCreateReducer from './order-create/order-create.reducer';
import orderDetailsReducer from './order-details/order-details.reducer';

// Reducer related to notification
import notificationReducer from './notification/notification.reducer';

// Reducer related to payment
import paymentReducer from './payment/payment.reducer';

// Reducer related to country
import countryListReducer from './country-list/country-list.reducer';

// Reducer related to search
import searchReducer from './search/search.reducer';

// Configure redux persist for cart
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart'],
};

const rootReducer = combineReducers({
	auth: authReducer,

	categoryList: categoryListReducer,
	cart: cartReducer,
	countryList: countryListReducer,

	notification: notificationReducer,
	orderList: orderListReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,

	productList: productListReducer,
	productDetails: productDetailsReducer,
	payment: paymentReducer,

	relatedProduct: relatedProductReducer,
	reviewList: reviewListReducer,

	search: searchReducer,

	user: userReducer,
	userAddress: userAddressReducer,
	userAvatar: userAvatarReducer,
	userProfile: userProfileReducer,
});

export default persistReducer(persistConfig, rootReducer);
