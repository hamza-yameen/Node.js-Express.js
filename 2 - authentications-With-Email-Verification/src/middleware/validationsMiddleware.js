const { body } = require("express-validator");

exports.signinValidation = [
	body("email").notEmpty(),
	body("password").notEmpty(),
];

exports.registrationValidationRules = [
	body("email").isEmail().notEmpty(),
	body("password").isLength({ min: 8 }),
	body("userName").isString().notEmpty(),
];
