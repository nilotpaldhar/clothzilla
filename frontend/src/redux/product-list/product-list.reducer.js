import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_LOAD_MORE_REQUEST,
	PRODUCT_LOAD_MORE_SUCCESS,
	PRODUCT_LOAD_MORE_FAIL,
} from './product-list.types';

const INITIAL_STATE = {
	loading: false,
	loadMore: false,
	error: null,
	products: [],
	pages: null,
	page: null,
};

const productListReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { ...state, loading: true };

		case PRODUCT_LOAD_MORE_REQUEST:
			return { ...state, loadMore: true };

		case PRODUCT_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				products: action.payload.products,
				pages: action.payload.meta.totalPages,
				page: action.payload.meta.currentPage,
			};

		case PRODUCT_LOAD_MORE_SUCCESS:
			return {
				...state,
				loadMore: false,
				products: [...state.products, ...action.payload.products],
				pages: action.payload.meta.totalPages,
				page: action.payload.meta.currentPage,
			};

		case PRODUCT_LIST_FAIL:
		case PRODUCT_LOAD_MORE_FAIL:
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
};

export default productListReducer;
