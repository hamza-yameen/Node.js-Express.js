const { BadRequestException } = require("../utils/httpExceptionSchema");
const { responseHandler } = require("../utils/responseWrapper");
const userRoleService = require("../services/userRoleService");

getAllRoles = async (req, res, next) => {
	try {
		const roles = await userRoleService.getAllRoles();
		const data = {
			roles: roles,
			totalUsers: roles.length,
		};
		return res.status(200).json(responseHandler(200, data));
	} catch (err) {
		const error = new BadRequestException();
		return next(error);
	}
};

const rolesController = {
	getAllRoles,
};

module.exports = rolesController;
