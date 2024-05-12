const prisma = require("../libs/prismaBase");

const getUserByName = async (name) => {
	const user = await prisma.user.findFirst({
		where: {
			userName: name,
		},
	});
	return user ? user : null;
};

const getUserByEmail = async (email) => {
	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});
	return user ? user : null;
};

const getUserById = async (id) => {
	const user = await prisma.user.findUnique({
		where: {
			id: id,
		},
	});
	return user ? user : null;
};

const createNewUser = async (userName, email, password) => {
	const newUser = await prisma.user.create({
		data: {
			userName: userName,
			email: email,
			password: password,
			updatedAt: new Date(),
		},
	});
	return newUser ? newUser : null;
};

const deleteAllUsers = async () => {
	return await prisma.user.deleteMany({});
};

const getAllUsers = async () => {
	return await prisma.user.findMany();
};

const updateUserActiveStatus = async (userId) => {
	const updatedUser = await prisma.user.update({
		where: { id: userId },
		data: {
			isAccountAcive: true,
			updatedAt: new Date(),
		},
	});
	return updatedUser ? updatedUser : null;
};

const getUserWithRoleById = async (userId) => {
	const getUserWithRole = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		include: {
			roleMappings: {
				include: {
					role: true,
				},
			},
		},
	});

	if (!getUserWithRole) {
		return null;
	}

	const userWithRole = {
		id: getUserWithRole.id,
		userName: getUserWithRole.userName,
		email: getUserWithRole.email,
		isAccountAcive: getUserWithRole.isAccountAcive,
		createdAt: getUserWithRole.createdAt,
		updatedAt: getUserWithRole.updatedAt,
		role: getUserWithRole.roleMappings.role,
	};
	return userWithRole;
};

const getUserWithRoleByEmail = async (email) => {
	const getUserWithRole = await prisma.user.findUnique({
		where: {
			email: email,
		},
		include: {
			roleMappings: {
				include: {
					role: true,
				},
			},
		},
	});
	return getUserWithRole ? getUserWithRole : null;
};

const getAllUserWithSameRoleByRoleId = async (roleId) => {
	const usersWithRole = await prisma.roleMapping.findMany({
		where: {
			roleId: roleId,
		},
		include: {
			user: true,
		},
	});
	return usersWithRole ? usersWithRole : null;
};

const userService = {
	getUserById,
	getUserByName,
	getUserByEmail,
	createNewUser,
	deleteAllUsers,
	getAllUsers,
	updateUserActiveStatus,
	getUserWithRoleById,
	getUserWithRoleByEmail,
	getAllUserWithSameRoleByRoleId,
};

module.exports = userService;
