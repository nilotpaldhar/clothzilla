import { createSelector } from 'reselect';

const selectUserAddress = (state) => state.userAddress;

// Select user address loading state
export const selectAddressLoading = createSelector(
	[selectUserAddress],
	(userAddress) => userAddress.loading
);

// Select user address updating state
export const selectAddressUpdating = createSelector(
	[selectUserAddress],
	(userAddress) => userAddress.updating
);

// Select user address
export const selectAddress = createSelector(
	[selectUserAddress],
	(userAddress) => userAddress.shippingAddress
);

// Select user address error
export const selectAddressError = createSelector(
	[selectUserAddress],
	(userAddress) => userAddress.error
);
