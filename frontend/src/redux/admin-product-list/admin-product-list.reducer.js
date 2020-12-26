import {
	ADMIN_PRODUCT_LIST_REQUEST,
	ADMIN_PRODUCT_LIST_SUCCESS,
	ADMIN_PRODUCT_LIST_FAIL,
	ADMIN_PRODUCT_DELETE,
} from './admin-product-list.types';

const INITIAL_STATE = {
	loading: false,
	error: null,
	products: [],
};

const adminProductListReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADMIN_PRODUCT_LIST_REQUEST:
			return { ...state, loading: true };

		case ADMIN_PRODUCT_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				products: action.payload,
			};

		case ADMIN_PRODUCT_LIST_FAIL:
			return { ...state, loading: false, error: action.payload };

		case ADMIN_PRODUCT_DELETE:
			return {
				...state,
				products: state.products.filter(
					(product) => product._id !== action.payload
				),
			};

		default:
			return state;
	}
};

export default adminProductListReducer;
