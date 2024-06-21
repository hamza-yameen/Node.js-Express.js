const dotenv = require("dotenv");

dotenv.config();

const config = {
	sendGridApiKey: process.env.SENDGRID_API_KEY,
};

module.exports = config;
