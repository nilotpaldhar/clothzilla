import axios from 'axios';
import {
	COUNTRY_LIST_REQUEST,
	COUNTRY_LIST_SUCCESS,
	COUNTRY_LIST_FAIL,
} from './country-list.types';
import parseErrorMsg from '../../utils/parseErrorMsg';

// Fetch countries
export const countryListRequest = () => ({ type: COUNTRY_LIST_REQUEST });
export const countryListSuccess = (data) => ({
	type: COUNTRY_LIST_SUCCESS,
	payload: data,
});
export const countryListFail = (error) => ({
	type: COUNTRY_LIST_FAIL,
	payload: error,
});
export const fetchCountries = () => async (dispatch) => {
	dispatch(countryListRequest());
	try {
		const { data } = await axios.get(process.env.REACT_APP_COUNTRY_LIST_API);
		dispatch(countryListSuccess(data));
	} catch (error) {
		dispatch(countryListFail(parseErrorMsg(error)));
	}
};
