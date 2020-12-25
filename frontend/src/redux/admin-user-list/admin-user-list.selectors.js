import { createSelector } from 'reselect';

const selectAdminUserList = (state) => state.adminUserList;

// Select is admin users loading
export const selectAdminUsersLoading = createSelector(
	[selectAdminUserList],
	(adminUserList) => adminUserList.loading
);

// Select admin users
export const selectAdminUsers = createSelector(
	[selectAdminUserList],
	(adminUserList) => adminUserList.users
);

// Select admin users error
export const selectAdminUsersError = createSelector(
	[selectAdminUserList],
	(adminUserList) => adminUserList.error
);
