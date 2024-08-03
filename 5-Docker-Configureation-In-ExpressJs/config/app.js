import dotenv from "dotenv";

dotenv.config();

class Configuration {
	constructor() {
		this.ENVIRONMENT = process.env.NODE_ENV;
		this.PORT = process.env.PORT;
		this.DB = {
			DATABASE_URL: process.env.DATABASE_URL,
		};
		this.JWT = {
			JWT_SECRET: process.env.JWT_SECRET,
		};
		this.REDIS = {
			REDIS_URL: process.env.REDIS_URL,
		};
		this.SENDGRID = {
			SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
			SENDER_EMAIL: process.env.SENDER_EMAIL,
			SENDER_USER_NAME: process.env.SENDER_USER_NAME,
		};
	}
}

const config = new Configuration();

export default config;
