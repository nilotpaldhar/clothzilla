import {
	RELATED_PRODUCT_REQUEST,
	RELATED_PRODUCT_SUCCESS,
	RELATED_PRODUCT_FAIL,
} from './related-product.types';

const INITIAL_STATE = {
	loading: false,
	error: null,
	products: [],
};

const relatedProductReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case RELATED_PRODUCT_REQUEST:
			return { ...state, loading: true };

		case RELATED_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				products: action.payload,
				error: null,
			};

		case RELATED_PRODUCT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default relatedProductReducer;
