const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const ResponseMessages = require("../utils/responseMessages");
const { BadRequestException } = require("../utils/httpExceptionSchema");
const { responseHandler } = require("../utils/responseWrapper");
const userService = require("../services/userService");
const activationCodeService = require("../services/activationCode");
const userRoleService = require("../services/userRoleService");
const { signJWT } = require("../libs/jwt");
const { sendVerificationMail } = require("../libs/SendGrid");
const { generateRandomNumber, checkIsCodeValid } = require("../helpers/common");
const { UserRoleEnum } = require("../helpers/enums");

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

	// Create New User
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

	// User Role Mapping
	const getRole = await userRoleService.getRoleByName(UserRoleEnum.USER);
	if (!getRole) {
		const error = new BadRequestException(
			ResponseMessages.PLEASE_ADD_THE_ROLES_IN_DATABASE
		);
		return next(error);
	}
	const saveUserRole = await userRoleService.saveUserRole(
		newCreatedUser.id,
		getRole.id
	);
	if (!saveUserRole) {
		const error = new BadRequestException(
			ResponseMessages.SOMETHING_WENT_WRONG_WITH_SAVING_THE_USER_ROLE_RECORDS
		);
		return next(error);
	}

	// Crate Activatio Code
	const generatedCode = await generateRandomNumber();
	const saveCodeRecord = await activationCodeService.saveCode(
		newCreatedUser.id,
		generatedCode,
		"activate_account"
	);
	if (!saveCodeRecord) {
		const error = new BadRequestException(
			ResponseMessages.SOMETHING_WENT_WRONG_CODE_CREATED_PROCESS
		);
		return next(error);
	}

	// Send Activation
	const message = {
		to: email,
		from: {
			name: process.env.SENDER_USER_NAME,
			email: process.env.SENDER_EMAIL,
		},
		subject: "Activation Account Code",
		html: `<div><p>Thank you for signing up. Please insert the activate code for activate your account</p></br>
		<strong>${generatedCode}</strong>
		</div>`,
	};
	await sendVerificationMail(message);

	const token = await signJWT({
		userId: newCreatedUser.id,
		userName: newCreatedUser.userName,
		userEmail: newCreatedUser.email,
	});

	const data = {
		message: "Please check your email for the activation link.",
		token: token,
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
	const user = await userService.getUserWithRoleByEmail(email);
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
		message: "User logged in successfully.",
		user: {
			id: user.id,
			userName: user.userName,
			email: user.email,
			userIsActive: user.isAccountAcive,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			role: user.roleMappings.role,
		},
		token: token,
	};

	return res.status(200).json(responseHandler(200, data));
};

verifyUser = async (req, res, next) => {
	const userDetail = req.body.userData;
	const code = req.query.code;
	if (!code || isNaN(parseInt(code))) {
		const error = new BadRequestException(
			ResponseMessages.INVALID_ACTIVATION_CODE
		);
		return next(error);
	}

	const getCode = await activationCodeService.getCodeByCode(parseInt(code));
	if (!getCode) {
		const error = new BadRequestException(
			ResponseMessages.INVALID_ACTIVATION_CODE
		);
		return next(error);
	}

	const isCodeValid = await checkIsCodeValid(getCode.createdAt);
	if (!isCodeValid) {
		const error = new BadRequestException(
			ResponseMessages.ACTIVATION_CODE_HAS_EXPIRED_PLEASE_TRY_AGAIN
		);
		return next(error);
	}

	await userService.updateUserActiveStatus(userDetail.id);
	await activationCodeService.updateCodeUsedTime(getCode.id);

	const data = {
		message: "User has been activated.",
		user: {
			id: userDetail.id,
			userName: userDetail.userName,
			email: userDetail.email,
			userIsActive: userDetail.isAccountAcive,
			createdAt: userDetail.createdAt,
			updatedAt: userDetail.updatedAt,
			role: userDetail.role,
		},
	};

	return res.status(200).json(responseHandler(200, data));
};

const authController = {
	signUp,
	signIn,
	verifyUser,
};

module.exports = authController;
