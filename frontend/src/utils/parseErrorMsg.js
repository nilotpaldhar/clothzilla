// Parsing error message from the error object
const parseErrorMsg = (error = {}) => {
	return error.response && error.response.data.message
		? error.response.data.message
		: error.response;
};

export default parseErrorMsg;
