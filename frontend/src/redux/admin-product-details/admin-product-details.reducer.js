import {
	ADMIN_PRODUCT_DETAILS_REQUEST,
	ADMIN_PRODUCT_DETAILS_SUCCESS,
	ADMIN_PRODUCT_DETAILS_FAIL,
} from './admin-product-details.types';

const INITIAL_STATE = {
	loading: false,
	error: null,
	product: {},
};

const adminProductDetailsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADMIN_PRODUCT_DETAILS_REQUEST:
			return { ...state, loading: true };

		case ADMIN_PRODUCT_DETAILS_SUCCESS:
			return { ...state, loading: false, error: null, product: action.payload };

		case ADMIN_PRODUCT_DETAILS_FAIL:
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
};

export default adminProductDetailsReducer;
