import express from "express";
import cors from "cors";

import config from "./config/app.js";
import ResponseMessages from "./src/utils/responseMessages.js";
import { BadRequestException } from "./src/utils/httpExceptionSchema.js";
import responseHandler from "./src/utils/responseWrapper.js";
import { initializeRedisClient } from "./src/libs/redis.js";
import { swaggerSpec, swaggerUi } from "./config/swagger.js";
import logger from "./config/logger.js";

import authRoute from "./src/routes/authRoute.js";
import userRoute from "./src/routes/userRoute.js";
import roleRoute from "./src/routes/roleRoute.js";

const app = express();
const PORT = config.PORT;

app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(swaggerSpec, { explorer: true })
);

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// CORS
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Expose-Headers", "Content-Length");

	// Log the request method and URL
	logger.info(
		`Incoming request: ${req.method} ${req.url} Body: ${JSON.stringify(
			req.body
		)}`
	);
	next();
});

app.get("/", (req, res) => {
	res.json({ message: "Welcome to NodeJS Authtication API's." });
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/roles", roleRoute);

app.use((req, res, next) => {
	const error = new BadRequestException(
		ResponseMessages.COULD_NOT_FIND_ANY_ROUTE
	);
	throw error;
});

app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}

	res.status(error.code || 500).json(
		responseHandler(error.code || 500, {
			error: error.message || ResponseMessages.AN_UNKNOWN_ERROR_OCCURED,
		})
	);
});

async function startServer() {
	await initializeRedisClient();

	app.listen(PORT, function () {
		console.log(`Example app listening on port ${PORT}!`);
	});
}

startServer();
