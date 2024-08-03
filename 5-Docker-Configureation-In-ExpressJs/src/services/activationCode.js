import { prisma } from "../libs/prismaBase.js";

const saveCode = async (userId, code, action) => {
	const codeSaved = await prisma.activationCode.create({
		data: {
			userId: userId,
			code: code,
			action: action,
			updatedAt: new Date(),
		},
	});
	return codeSaved ? codeSaved : null;
};

const getCodeByCode = async (code) => {
	const getCode = await prisma.activationCode.findUnique({
		where: {
			code: code,
		},
	});
	return getCode ? getCode : null;
};

const updateCodeUsedTime = async (codeId) => {
	const updatedCodeRecord = await prisma.activationCode.update({
		where: { id: codeId },
		data: {
			usedAt: new Date(),
			updatedAt: new Date(),
		},
	});

	return updatedCodeRecord ? updatedCodeRecord : null;
};

export { saveCode, getCodeByCode, updateCodeUsedTime };
