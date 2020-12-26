import {
	ADMIN_PRODUCT_CREATE_REQUEST,
	ADMIN_PRODUCT_CREATE_SUCCESS,
	ADMIN_PRODUCT_CREATE_FAIL,
	ADMIN_PRODUCT_RESET,
} from './admin-product.types';

const INITIAL_STATE = {
	creating: false,
	createError: null,
	createSuccess: false,
	createdProduct: {},
};

const adminProductReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADMIN_PRODUCT_CREATE_REQUEST:
			return { ...state, creating: true };

		case ADMIN_PRODUCT_CREATE_SUCCESS:
			return {
				...state,
				creating: false,
				createError: null,
				createSuccess: true,
				createdProduct: action.payload,
			};

		case ADMIN_PRODUCT_CREATE_FAIL:
			return {
				...state,
				creating: false,
				createError: action.payload,
				createSuccess: false,
			};

		case ADMIN_PRODUCT_RESET:
			return {
				...state,
				creating: false,
				createError: null,
				createSuccess: false,
				createdProduct: {},
			};

		default:
			return state;
	}
};

export default adminProductReducer;
