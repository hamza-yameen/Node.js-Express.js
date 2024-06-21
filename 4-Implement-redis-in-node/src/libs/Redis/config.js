const dotenv = require("dotenv");

dotenv.config();

const config = {
	redisURL: process.env.REDIS_URL,
};

module.exports = config;
