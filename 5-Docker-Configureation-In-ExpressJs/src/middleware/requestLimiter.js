import { rateLimiter } from "../libs/redis.js";
import responseHandler from "../utils/responseWrapper.js";

export const requestLimiter = async (req, res, next) => {
	const limit = 10;
	const timer = 120;

	const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
	const key = `${clientIp}:request_count`;

	const { requestCount, timeRemaining } = await rateLimiter(timer, key);

	if (requestCount > limit) {
		return res.status(400).json(
			responseHandler(400, {
				error: `Too many requests, please try again in ${timeRemaining} seconds.`,
			})
		);
	}

	next();
};
