const prisma = require("../libs/prismaBase");

const saveUserRole = async (userId, roleId) => {
	const userRoleSaved = await prisma.roleMapping.create({
		data: {
			userId: userId,
			roleId: roleId,
			updatedAt: new Date(),
		},
	});
	return userRoleSaved ? userRoleSaved : null;
};

const getRoleByName = async (roleName) => {
	const role = await prisma.role.findUnique({
		where: {
			name: roleName,
		},
	});
	return role ? role : null;
};

const getAllRoles = async () => {
	return await prisma.role.findMany();
};

const userRoleService = {
	saveUserRole,
	getRoleByName,
	getAllRoles,
};

module.exports = userRoleService;
