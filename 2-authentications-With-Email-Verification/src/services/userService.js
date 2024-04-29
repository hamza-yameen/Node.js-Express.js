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
		},
	});
	return updatedUser ? updatedUser : null;
};

const userService = {
	getUserById,
	getUserByName,
	getUserByEmail,
	createNewUser,
	deleteAllUsers,
	getAllUsers,
	updateUserActiveStatus,
};

module.exports = userService;
