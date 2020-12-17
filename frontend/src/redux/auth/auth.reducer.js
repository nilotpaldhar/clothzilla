const INITIAL_STATE = {
	isAuthenticated: false,
	token: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default authReducer;
