class HttpException extends Error {
	constructor(message, statusCode) {
		super(message);
		this.code = statusCode;
	}
}

class NotFoundException extends HttpException {
	constructor(message = "errors.not_found") {
		super(message, 404);
	}
}

class UnAuthorizedException extends HttpException {
	constructor(message = "errors.unauthorized") {
		super(message, 401);
	}
}

class BadRequestException extends HttpException {
	constructor(message = "errors.bad_request") {
		super(message, 400);
	}
}

class ForbiddenException extends HttpException {
	constructor(message = "errors.forbidden") {
		super(message, 403);
	}
}

class FatalErrorException extends HttpException {
	constructor(message = "errors.fatal") {
		super(message, 500);
	}
}

class UnprocessableEntityException extends HttpException {
	constructor(message = "errors.unprocessable_entity") {
		super(message, 422);
	}
}

export {
	NotFoundException,
	UnAuthorizedException,
	BadRequestException,
	ForbiddenException,
	FatalErrorException,
	UnprocessableEntityException,
};
