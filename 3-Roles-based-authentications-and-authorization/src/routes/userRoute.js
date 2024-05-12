const { userController } = require("../controllers");
const router = require("express").Router();
const { authenticateToken } = require("../middleware/authenticateToken");

router.get("/", [authenticateToken], userController.getAllUsers);
router.delete("/all", [authenticateToken], userController.delAllUsers);
router.get(
	"/withroles/:roleId",
	[authenticateToken],
	userController.getAllUserWithSameRoleByRoleId
);

module.exports = router;
