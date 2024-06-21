const router = require("express").Router();
const { roleController } = require("../controllers");
const { authenticateToken } = require("../middleware/authenticateToken");
const { requestLimiter } = require("../middleware/requestLimiter");

router.get(
	"/",
	[authenticateToken],
	[requestLimiter],
	roleController.getAllRoles
);

module.exports = router;
