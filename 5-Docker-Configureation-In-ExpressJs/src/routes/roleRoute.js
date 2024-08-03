import { Router } from "express";
import { allRoles } from "../controllers/roleController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { requestLimiter } from "../middleware/requestLimiter.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: The roles managing API
 * /api/roles:
 *   get:
 *     summary: Get a list of all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "1c274bcd-f8e8-41b2-a22e-7883984d9078"
 *                           name:
 *                             type: string
 *                             example: "ADMIN"
 *                           description:
 *                             type: string
 *                             example: "Administrator"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-06-21T21:33:42.266Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-06-21T21:33:42.245Z"
 *                     totalUsers:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Bad Request"
 */

router.get("/", [authenticateToken], [requestLimiter], allRoles);

export default router;
