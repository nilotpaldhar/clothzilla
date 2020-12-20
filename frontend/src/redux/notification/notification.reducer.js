import { CREATE_NOTIFICATION, REMOVE_NOTIFICATION } from './notification.types';

const INITIAL_STATE = {
	message: '',
	variant: '',
};

const notificationReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CREATE_NOTIFICATION:
			return {
				...state,
				message: action.payload.message,
				variant: action.payload.variant,
			};

		case REMOVE_NOTIFICATION:
			return {
				...state,
				message: '',
				variant: '',
			};

		default:
			return state;
	}
};

export default notificationReducer;
