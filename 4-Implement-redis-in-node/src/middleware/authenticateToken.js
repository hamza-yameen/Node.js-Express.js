const ResponseMessages = require("../utils/responseMessages");
const {
	UnAuthorizedException,
	ForbiddenException,
} = require("../utils/httpExceptionSchema");
const userService = require("../services/userService");
const { verifyJWT } = require("../libs/jwt");

exports.authenticateToken = async (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) {
		const error = new UnAuthorizedException(
			ResponseMessages.AUTHORIZATION_FAILED
		);
		return next(error);
	}

	const { payload, expired } = await verifyJWT(token);
	if (expired) {
		const error = new ForbiddenException(ResponseMessages.TOKEN_EXPIRED);
		return next(error);
	}

	const getUserWithRoleById = await userService.getUserWithRoleById(
		payload.userId
	);
	if (!getUserWithRoleById) {
		const error = new UnAuthorizedException(
			ResponseMessages.AUTHORIZATION_FAILED
		);
		return next(error);
	}

	req.body.userData = getUserWithRoleById;
	next();
};
