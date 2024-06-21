const { BadRequestException } = require("../utils/httpExceptionSchema");
const { responseHandler } = require("../utils/responseWrapper");
const userRoleService = require("../services/userRoleService");
const {
	writeData,
	readData,
	requestToKey,
	keyExists,
} = require("../libs/Redis");

getAllRoles = async (req, res, next) => {
	const cachedKey = requestToKey(req);
	const isKeyExists = await keyExists(cachedKey);

	// Get Data From the cached(Redis)
	if (isKeyExists) {
		const getcachedRoles = await readData(cachedKey);
		if (getcachedRoles) {
			return res.status(200).json(responseHandler(200, getcachedRoles));
		}
	}

	try {
		const roles = await userRoleService.getAllRoles();
		const data = {
			roles: roles,
			totalUsers: roles.length,
		};

		// store data in cache
		await writeData(cachedKey, data);

		// return the response
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
