import { createSelector } from 'reselect';

const selectUserAvatar = (state) => state.userAvatar;

// Select avatar loading state
export const selectAvatarLoading = createSelector(
	[selectUserAvatar],
	(userAvatar) => userAvatar.loadingAvatar
);

// Select avatar url
export const selectAvatarUrl = createSelector(
	[selectUserAvatar],
	(userAvatar) => userAvatar.avatarUrl
);

// Select avatar error
export const selectAvatarError = createSelector(
	[selectUserAvatar],
	(userAvatar) => userAvatar.avatarError
);
