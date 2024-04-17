const ResponseMessages = require("../utils/responseMessages");
const { UnAuthorizedException } = require("../utils/httpExceptionSchema");
const userService = require("../services/userService");
const { verifyJWT } = require("../libs/jwt");

exports.authenticateToken = async (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	if (!token) {
		const error = new UnAuthorizedException(
			ResponseMessages.AUTHORIZATION_FAILED
		);
		return next(error);
	}

	const { payload, expired } = await verifyJWT(token);
	if (expired)
		return next(new ForbiddenException(ResponseMessages.TOKEN_EXPIRED));

	const getUserById = await userService.getUserById(payload.userId);
	if (!getUserById) {
		const error = new UnAuthorizedException(
			ResponseMessages.AUTHORIZATION_FAILED
		);
		return next(error);
	}

	req.body.userData = getUserById;
	next();
};
