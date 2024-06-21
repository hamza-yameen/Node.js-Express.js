const jwt = require("jsonwebtoken");

exports.signJWT = async (payload) => {
	return await jwt.sign(payload, process.env.JWT_SECRET, {
		algorithm: "HS256",
		expiresIn: "1h",
	});
};

exports.verifyJWT = async (token) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const currentTime = Math.floor(Date.now() / 1000);
		if (decoded.exp <= currentTime) {
			return { payload: null, expired: true };
		}
		return { payload: decoded, expired: false };
	} catch (error) {
		return { payload: null, expired: true };
	}
};
