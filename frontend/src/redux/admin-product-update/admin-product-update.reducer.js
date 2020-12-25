import {
	ADMIN_PRODUCT_UPDATE_REQUEST,
	ADMIN_PRODUCT_UPDATE_SUCCESS,
	ADMIN_PRODUCT_UPDATE_FAIL,
} from './admin-product-update.types';

const INITIAL_STATE = {
	loading: false,
	error: null,
	product: {},
};

const adminProductUpdateReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADMIN_PRODUCT_UPDATE_REQUEST:
			return { ...state, loading: true };

		case ADMIN_PRODUCT_UPDATE_SUCCESS:
			return { ...state, loading: true, error: null, product: action.payload };

		case ADMIN_PRODUCT_UPDATE_FAIL:
			return { ...state, loading: true, error: action.payload };

		default:
			return state;
	}
};

export default adminProductUpdateReducer;
