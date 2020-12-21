import { createSelector } from 'reselect';

const selectUserProfile = (state) => state.userProfile;

// Select user profile loading state
export const selectUserProfileLoading = createSelector(
	[selectUserProfile],
	(userProfile) => userProfile.loading
);

// Select user address updating state
export const selectUserProfileUpdating = createSelector(
	[selectUserProfile],
	(userProfile) => userProfile.updating
);

// Select user address
export const selectUserProfileDetails = createSelector(
	[selectUserProfile],
	(userProfile) => userProfile.details
);

// Select user address error
export const selectUserProfileError = createSelector(
	[selectUserProfile],
	(userProfile) => userProfile.error
);
