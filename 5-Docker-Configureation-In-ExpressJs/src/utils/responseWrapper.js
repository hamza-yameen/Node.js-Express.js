const responseHandler = (statusCode, data) => {
	return {
		statusCode: statusCode,
		data: data,
	};
};

export default responseHandler;
