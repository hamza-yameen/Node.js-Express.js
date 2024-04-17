const router = require("express").Router();
const { authController } = require("../controllers");
const {
	signinValidation,
	registrationValidationRules,
} = require("../middleware/validationsMiddleware");

router.post("/register", [registrationValidationRules], authController.signUp);
router.post("/login", [signinValidation], authController.signIn);

module.exports = router;
