const express = require("express");
const cors = require("cors");

const ResponseMessages = require("./src/utils/responseMessages");
const { BadRequestException } = require("./src/utils/httpExceptionSchema");
const { responseHandler } = require("./src/utils/responseWrapper");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Expose-Headers", "Content-Length");
	next();
});

app.get("/", (req, res) => {
	res.json({ message: "Welcome to NodeJS Authtication API's." });
});

app.use("/api/auth", require("./src/routes/authRoute"));
app.use("/api/user", require("./src/routes/userRoute"));

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

app.listen(PORT, function () {
	console.log(`Example app listening on port ${PORT}!`);
});
