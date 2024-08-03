import winston from "winston";
import "winston-daily-rotate-file";

const logsConfiguration = {
	transports: [
		new winston.transports.DailyRotateFile({
			filename: "./src/logs/application-%DATE%.log",
			datePattern: "YYYY-MM-DD",
			zippedArchive: true,
			maxSize: "20m",
			maxFiles: "14d",
		}),
	],
	format: winston.format.combine(
		winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
		winston.format.printf(
			(info) => `${info.timestamp} ${info.level}: ${info.message}`
		)
	),
};

const logger = winston.createLogger(logsConfiguration);

export default logger;
