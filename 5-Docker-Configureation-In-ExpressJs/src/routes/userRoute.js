import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import {
	allUsers,
	delAllUsers,
	allUserWithSameRoleByRoleId,
} from "../controllers/userController.js";

const router = Router();

router.get("/", [authenticateToken], allUsers);
router.delete("/all", [authenticateToken], delAllUsers);
router.get(
	"/withroles/:roleId",
	[authenticateToken],
	allUserWithSameRoleByRoleId
);

export default router;
