import { createSelector } from 'reselect';

const selectCountryList = (state) => state.countryList;

// Select is countries loading
export const selectCounryListLoading = createSelector(
	[selectCountryList],
	(countryList) => countryList.loading
);

// Select countries
export const selectCountries = createSelector(
	[selectCountryList],
	(countryList) => countryList.countries
);

// Select country list error
export const selectCounryListError = createSelector(
	[selectCountryList],
	(countryList) => countryList.error
);
