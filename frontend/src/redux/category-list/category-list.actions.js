import {
	CATEGORY_LIST_REQUEST,
	CATEGORY_LIST_SUCCESS,
	CATEGORY_LIST_FAIL,
	SET_ACTIVE_CATEGORY,
} from './category-list.types';
import categoryApi from '../../api/category/category.api';
import parseErrorMsg from '../../utils/parseErrorMsg';

// Fetch product categories
export const categoryListRequest = () => ({ type: CATEGORY_LIST_REQUEST });
export const categoryListSuccess = (data) => ({
	type: CATEGORY_LIST_SUCCESS,
	payload: data,
});
export const categoryListFail = (error) => ({
	type: CATEGORY_LIST_FAIL,
	payload: error,
});
export const fetchCategories = () => async (dispatch) => {
	dispatch(categoryListRequest());
	try {
		const { data } = await categoryApi.getCategories();
		dispatch(categoryListSuccess(data));
	} catch (error) {
		dispatch(categoryListFail(parseErrorMsg(error)));
	}
};

// Set active currently active product category
export const setActiveCategory = (categoryId) => ({
	type: SET_ACTIVE_CATEGORY,
	payload: categoryId,
});
