import {
	PAYMENT_REQUEST,
	PAYMENT_SUCCESS,
	PAYMENT_FAIL,
} from './payment.types';

const INITIAL_STATE = {
	loading: false,
	success: false,
	error: null,
};

const paymentReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PAYMENT_REQUEST:
			return { ...state, loading: true };

		case PAYMENT_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				error: null,
			};

		case PAYMENT_FAIL:
			return {
				...state,
				loading: false,
				success: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default paymentReducer;
