import ResponseMessages from "../utils/responseMessages.js";
import {
	UnAuthorizedException,
	ForbiddenException,
} from "../utils/httpExceptionSchema.js";
import { getUserWithRoleById } from "../services/userService.js";
import { verifyJWT } from "../libs/jwt.js";

export const authenticateToken = async (req, res, next) => {
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

	const getUser = await getUserWithRoleById(payload.userId);
	if (!getUser) {
		const error = new UnAuthorizedException(
			ResponseMessages.AUTHORIZATION_FAILED
		);
		return next(error);
	}

	req.body.userData = getUser;
	next();
};
