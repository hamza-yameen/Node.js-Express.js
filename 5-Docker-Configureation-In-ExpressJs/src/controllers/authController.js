import bcrypt from "bcryptjs";

import config from "../../config/app.js";
import ResponseMessages from "../utils/responseMessages.js";
import { BadRequestException } from "../utils/httpExceptionSchema.js";
import responseHandler from "../utils/responseWrapper.js";
import {
	getUserByName,
	getUserByEmail,
	getUserById,
	createNewUser,
	getUserWithRoleByEmail,
	updateUserActiveStatus,
	updateUserPassword,
} from "../services/userService.js";
import {
	saveCode,
	getCodeByCode,
	updateCodeUsedTime,
} from "../services/activationCode.js";
import { getRoleByName, saveUserRole } from "../services/userRoleService.js";
import { signJWT } from "../libs/jwt.js";
import { sendVerificationMail } from "../libs/SendGrid/index.js";
import { generateRandomNumber, checkIsCodeValid } from "../helpers/common.js";
import { UserRoleEnum } from "../helpers/enums.js";

const signUp = async (req, res, next) => {
	const { userName, email, password } = req.body;

	// Check Username exist
	const getUserByUserName = await getUserByName(userName);
	if (getUserByUserName) {
		const error = new BadRequestException(
			ResponseMessages.USERNAME_ALREADY_EXISTS
		);
		return next(error);
	}

	// Check Username exist
	const getUserByUserEmail = await getUserByEmail(email);
	if (getUserByUserEmail) {
		const error = new BadRequestException(
			ResponseMessages.EMAIL_ALREADY_EXISTS
		);
		return next(error);
	}

	// Create New User
	const newCreatedUser = await createNewUser(
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
	const getRole = await getRoleByName(UserRoleEnum.USER);
	if (!getRole) {
		const error = new BadRequestException(
			ResponseMessages.PLEASE_ADD_THE_ROLES_IN_DATABASE
		);
		return next(error);
	}
	const creatUserRole = await saveUserRole(newCreatedUser.id, getRole.id);
	if (!creatUserRole) {
		const error = new BadRequestException(
			ResponseMessages.SOMETHING_WENT_WRONG_WITH_SAVING_THE_USER_ROLE_RECORDS
		);
		return next(error);
	}

	// Crate Activatio Code
	const generatedCode = await generateRandomNumber();
	const saveCodeRecord = await saveCode(
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
			name: config.SENDGRID.SENDER_USER_NAME,
			email: config.SENDGRID.SENDER_EMAIL,
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

const signIn = async (req, res, next) => {
	const { email, password } = req.body;
	const user = await getUserWithRoleByEmail(email);
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

const verifyUser = async (req, res, next) => {
	const getCode = await getCodeByCode(parseInt(code));
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

	await updateUserActiveStatus(userDetail.id);
	await updateCodeUsedTime(getCode.id);

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

const resetPassword = async (req, res, next) => {
	const { oldPassword, newPassword, userData } = req.body;

	const user = await getUserById(userData.id);
	if (!user) {
		const error = new BadRequestException(ResponseMessages.USER_NOT_FOUND);
		return next(error);
	}

	const passwordIsValid = bcrypt.compareSync(oldPassword, user.password);
	if (!passwordIsValid) {
		const error = new BadRequestException(
			ResponseMessages.PLEASE_ENTER_VALIDE_PASSWORD
		);
		return next(error);
	}

	const isUserPasswordupdated = await updateUserPassword(
		user.id,
		bcrypt.hashSync(newPassword, 8)
	);
	if (!isUserPasswordupdated) {
		const error = new BadRequestException(
			ResponseMessages.SOMETHING_WENT_WRONG_CODE_CREATED_PROCESS
		);
		return next(error);
	}

	return res.status(200).json(
		responseHandler(200, {
			message: "User password updated successfully.",
		})
	);
};

export { signUp, signIn, verifyUser, resetPassword };
