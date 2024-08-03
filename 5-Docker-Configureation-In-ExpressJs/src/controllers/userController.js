import { BadRequestException } from "../utils/httpExceptionSchema.js";
import responseHandler from "../utils/responseWrapper.js";
import {
	getAllUsers,
	deleteAllUsers,
	getAllUserWithSameRoleByRoleId,
} from "../services/userService.js";

const allUsers = async (req, res, next) => {
	try {
		const users = await getAllUsers();
		const data = {
			users: users,
			totalUsers: users.length,
		};
		return res.status(200).json(responseHandler(200, data));
	} catch (err) {
		const error = new BadRequestException();
		return next(error);
	}
};

const delAllUsers = async (req, res, next) => {
	await deleteAllUsers();
	return res
		.status(200)
		.json(responseHandler(200, { message: "All Users Deleted" }));
};

const allUserWithSameRoleByRoleId = async (req, res, next) => {
	const roldId = req.params.roleId;

	const users = await getAllUserWithSameRoleByRoleId(roldId);

	if (!users || users.length <= 0) {
		return res
			.status(200)
			.json(responseHandler(200, { message: "No users found" }));
	}

	const userData = users.map((u) => {
		return {
			id: u.user.id,
			userName: u.user.userName,
			email: u.user.email,
			isAccountAcive: u.user.isAccountAcive,
			createdAt: u.user.createdAt,
			updatedAt: u.user.updatedAt,
		};
	});

	const data = {
		users: userData,
		totalUsers: userData.length,
	};

	return res.status(200).json(responseHandler(200, data));
};

export { allUsers, delAllUsers, allUserWithSameRoleByRoleId };
