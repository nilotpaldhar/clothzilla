import {
	CATEGORY_LIST_REQUEST,
	CATEGORY_LIST_SUCCESS,
	CATEGORY_LIST_FAIL,
	SET_ACTIVE_CATEGORY,
	CREATE_CATEGORY,
	EDIT_CATEGORY,
	UPDATE_CATEGORY,
	DELETE_CATEGORY,
} from './category-list.types';
import categoryApi from '../../api/category/category.api';
import { createNotification } from '../notification/notification.actions';
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

// Create new category
export const createCategory = (category) => (dispatch, getState) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { auth } = getState();
			const { data } = await categoryApi.createCategory(auth.token, category);
			dispatch({ type: CREATE_CATEGORY, payload: data });
			dispatch(createNotification('Category created successfully', 'success'));
			resolve(data);
		} catch (error) {
			const errorMsg = parseErrorMsg(error);
			dispatch(createNotification(errorMsg, 'error'));
			reject(errorMsg);
		}
	});
};

// Edit category
export const editCategory = (category) => ({
	type: EDIT_CATEGORY,
	payload: category,
});

// Update category
export const updateCategory = (id, category) => (dispatch, getState) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { auth } = getState();
			const { data } = await categoryApi.updateCategory(
				auth.token,
				id,
				category
			);
			dispatch({ type: UPDATE_CATEGORY, payload: data });
			dispatch(createNotification('Category updated successfully', 'success'));
			resolve(data);
		} catch (error) {
			const errorMsg = parseErrorMsg(error);
			dispatch(createNotification(errorMsg, 'error'));
			reject(errorMsg);
		}
	});
};

// Delete category
export const deleteCategory = (id) => (dispatch, getState) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { auth } = getState();
			await categoryApi.deleteCategory(auth.token, id);
			dispatch({ type: DELETE_CATEGORY, payload: id });
			dispatch(createNotification('Category deleted successfully', 'success'));
			resolve();
		} catch (error) {
			const errorMsg = parseErrorMsg(error);
			dispatch(createNotification(errorMsg, 'error'));
			reject(errorMsg);
		}
	});
};
