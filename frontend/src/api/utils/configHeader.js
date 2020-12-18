const configHeader = (token = '') => ({
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

export default configHeader;
