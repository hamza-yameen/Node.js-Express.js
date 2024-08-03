import { Router } from "express";
import {
	signUp,
	signIn,
	verifyUser,
	resetPassword,
} from "../controllers/authController.js";
import {
	signinValidation,
	registrationValidationRules,
	resetPasswordValidationRules,
} from "../middleware/validationsMiddleware.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { validateHandler } from "../middleware/validateHandler.js";

const router = Router();

router.post(
	"/register",
	[registrationValidationRules],
	validateHandler,
	signUp
);
router.post("/login", [signinValidation], validateHandler, signIn);
router.get("/verification", [authenticateToken], validateHandler, verifyUser);
router.post(
	"/resetpassword",
	[authenticateToken, resetPasswordValidationRules],
	validateHandler,
	resetPassword
);

export default router;
