const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const ResponseMessages = require("../utils/responseMessages");
const { BadRequestException } = require("../utils/httpExceptionSchema");
const { responseHandler } = require("../utils/responseWrapper");
const userService = require("../services/userService");
const { signJWT } = require("../libs/jwt");

signUp = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res
			.status(400)
			.json(responseHandler(400, { error: errors.array() }));
	}

	const { userName, email, password } = req.body;

	// Check Username exist
	const getUserByUserName = await userService.getUserByName(userName);
	if (getUserByUserName) {
		const error = new BadRequestException(
			ResponseMessages.USERNAME_ALREADY_EXISTS
		);
		return next(error);
	}

	// Check Username exist
	const getUserByUserEmail = await userService.getUserByEmail(email);
	if (getUserByUserEmail) {
		const error = new BadRequestException(
			ResponseMessages.EMAIL_ALREADY_EXISTS
		);
		return next(error);
	}

	const newCreatedUser = await userService.createNewUser(
		userName,
		email,
		bcrypt.hashSync(password, 8)
	);

	if (!newCreatedUser) {
		const error = new BadRequestException(
			ResponseMessages.SOMETHING_WENT_WRONG_USER_CREATED_PROCESS
		);
		return next(error);
	}

	const token = await signJWT({
		userId: newCreatedUser.id,
		userName: newCreatedUser.userName,
		userEmail: newCreatedUser.email,
	});

	const data = {
		message: "User Created",
		user: {
			id: newCreatedUser.id,
			userName: newCreatedUser.userName,
			email: newCreatedUser.email,
			token: token,
			createdAt: newCreatedUser.createdAt,
			updatedAt: newCreatedUser.updatedAt,
		},
	};
	return res.status(200).json(responseHandler(200, data));
};

signIn = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res
			.status(400)
			.json(responseHandler(400, { error: errors.array() }));
	}

	const { email, password } = req.body;
	const user = await userService.getUserByEmail(email);
	if (!user) {
		const error = new BadRequestException(
			ResponseMessages.ENTER_VALIDE_CREDENTIALS
		);
		return next(error);
	}

	const passwordIsValid = bcrypt.compareSync(password, user.password);
	if (!passwordIsValid) {
		const error = new BadRequestException(
			ResponseMessages.ENTER_VALIDE_CREDENTIALS
		);
		return next(error);
	}

	// Token assign
	const token = await signJWT({
		userId: user.id,
		userName: user.userName,
		userEmail: user.email,
	});

	const data = {
		id: user.id,
		userName: user.userName,
		email: user.email,
		token: token,
		createdAt: user.createdAt,
		token: token,
	};

	return res.status(200).json(responseHandler(200, data));
};

const authController = {
	signUp,
	signIn,
};

module.exports = authController;
