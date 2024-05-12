const { BadRequestException } = require("../utils/httpExceptionSchema");
const { responseHandler } = require("../utils/responseWrapper");
const userService = require("../services/userService");

getAllUsers = async (req, res, next) => {
	try {
		const users = await userService.getAllUsers();
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

delAllUsers = async (req, res, next) => {
	await userService.deleteAllUsers();
	return res
		.status(200)
		.json(responseHandler(200, { message: "All Users Deleted" }));
};

getAllUserWithSameRoleByRoleId = async (req, res, next) => {
	const roldId = req.query.roldid;
	const users = await userService.getAllUserWithSameRoleByRoleId(roldId);

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

const userController = {
	getAllUsers,
	delAllUsers,
	getAllUserWithSameRoleByRoleId,
};

module.exports = userController;
