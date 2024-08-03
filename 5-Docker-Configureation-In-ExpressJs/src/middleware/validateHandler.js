import { validationResult } from "express-validator";
import { BadRequestException } from "../utils/httpExceptionSchema.js";

export const validateHandler = (req, res, next) => {
	const errors = validationResult(req);

	const errorMessages = errors
		.array()
		.map((error) => error.msg)
		.join(",");

	if (errors.isEmpty()) {
		return next();
	} else {
		const error = new BadRequestException(errorMessages);
		return next(error);
	}
};
