import jwt from "jsonwebtoken";
import config from "../../config/app.js";

export const signJWT = async (payload) => {
	return await jwt.sign(payload, config.JWT.JWT_SECRET, {
		algorithm: "HS256",
		expiresIn: "1h",
	});
};

export const verifyJWT = async (token) => {
	try {
		const decoded = jwt.verify(token, config.JWT.JWT_SECRET);
		const currentTime = Math.floor(Date.now() / 1000);
		if (decoded.exp <= currentTime) {
			return { payload: null, expired: true };
		}
		return { payload: decoded, expired: false };
	} catch (error) {
		return { payload: null, expired: true };
	}
};
