import { BadRequestException } from "../utils/httpExceptionSchema.js";
import responseHandler from "../utils/responseWrapper.js";
import { getAllRoles } from "../services/userRoleService.js";
import { writeData, readData, requestToKey, keyExists } from "../libs/redis.js";

const allRoles = async (req, res, next) => {
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
		const roles = await getAllRoles();
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

const getAllRolesRoles = async (req, res, next) => {
	return res.status(200).json({ status: true });
};

export { allRoles, getAllRolesRoles };
