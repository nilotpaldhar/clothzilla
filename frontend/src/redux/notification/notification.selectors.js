import { createSelector } from 'reselect';

const selectNotification = (state) => state.notification;

// Select notification message
export const selectNotificationMessage = createSelector(
	[selectNotification],
	(notification) => notification.message
);

// Select notification variant
export const selectNotificationVariant = createSelector(
	[selectNotification],
	(notification) => notification.variant
);
