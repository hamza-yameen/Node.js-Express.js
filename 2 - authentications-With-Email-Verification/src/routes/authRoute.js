const router = require("express").Router();
const { authController } = require("../controllers");
const {
	signinValidation,
	registrationValidationRules,
} = require("../middleware/validationsMiddleware");
const { authenticateToken } = require("../middleware/authenticateToken");

router.post("/register", [registrationValidationRules], authController.signUp);
router.post("/login", [signinValidation], authController.signIn);
router.get("/verification", [authenticateToken], authController.verifyUser);

module.exports = router;
