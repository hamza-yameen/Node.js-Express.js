import { body } from "express-validator";

export const signinValidation = [
	body("email", "Please Enter Email").notEmpty(),
	body("password", "Please Enter Password").notEmpty(),
];

export const registrationValidationRules = [
	body("email", "Please Enter Email").isEmail().notEmpty(),
	body("password", "Please Enter Password")
		.isLength({ min: 8 })
		.withMessage("Password must be more than 7 characters long."),
	body("userName", "Please Enter Username").isString().notEmpty(),
];

export const resetPasswordValidationRules = [
	body("oldPassword", "Please Enter Old Password")
		.notEmpty()
		.isLength({ min: 8 })
		.withMessage("Password must be more than 7 characters long."),
	body("newPassword", "Please Enter New Password")
		.notEmpty()
		.isLength({ min: 8 })
		.withMessage("Password must be more than 7 characters long."),
];
