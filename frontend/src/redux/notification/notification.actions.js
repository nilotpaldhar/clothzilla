import { CREATE_NOTIFICATION, REMOVE_NOTIFICATION } from './notification.types';

// Create new notification
export const createNotification = (message, variant) => ({
	type: CREATE_NOTIFICATION,
	payload: { message, variant },
});

// Remove notification
export const removeNotification = () => ({ type: REMOVE_NOTIFICATION });
