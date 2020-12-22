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

// Select password updating state
export const selectUpdatingPassword = createSelector(
	[selectAuth],
	(auth) => auth.updatingPassword
);

// Select update password error
export const selectPasswordError = createSelector(
	[selectAuth],
	(auth) => auth.passwordError
);
