import {
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
} from './product-details.types';

const INITIAL_STATE = {
	loading: false,
	error: null,
	product: {},
};

const productDetailsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return { ...state, loading: true };

		case PRODUCT_DETAILS_SUCCESS:
			return { ...state, loading: false, error: null, product: action.payload };

		case PRODUCT_DETAILS_FAIL:
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
};

export default productDetailsReducer;
