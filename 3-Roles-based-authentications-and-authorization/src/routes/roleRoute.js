const router = require("express").Router();
const { roleController } = require("../controllers");
const { authenticateToken } = require("../middleware/authenticateToken");

router.get("/", [authenticateToken], roleController.getAllRoles);

module.exports = router;
