import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

// Select user loading state
export const selectLoading = createSelector(
	[selectUser],
	(selectUser) => selectUser.loading
);

// Select if user is authenicated or not
export const selectIsAuthenticated = createSelector(
	[selectUser],
	(user) => user.isAuthenticated
);

// Select if user is admin or not
export const selectIsAdmin = createSelector(
	[selectUser],
	(user) => user.isAdmin
);

// Select currently logged in user
export const selectUserDetails = createSelector(
	[selectUser],
	(user) => user.details
);

// Select  error
export const selectLoginError = createSelector(
	[selectUser],
	(user) => user.error
);
