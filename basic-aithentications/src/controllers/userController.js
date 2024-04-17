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

const userController = {
	getAllUsers,
	delAllUsers,
};

module.exports = userController;
