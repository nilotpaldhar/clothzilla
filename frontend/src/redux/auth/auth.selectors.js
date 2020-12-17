import { createSelector } from 'reselect';

const selectAuth = (state) => state.auth;

// Select auth loading state
export const selectLoading = createSelector(
	[selectAuth],
	(auth) => auth.loading
);

// Select login error
export const selectLoginError = createSelector(
	[selectAuth],
	(auth) => auth.loginError
);

// Select register error
export const selectRegisterError = createSelector(
	[selectAuth],
	(auth) => auth.registerError
);
