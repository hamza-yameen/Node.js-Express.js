import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
	await addRoles();
	await addUserWithRoleMapping();
}

async function addRoles() {
	const roles = [
		{ name: "USER", description: "Regular user", updatedAt: new Date() },
		{ name: "MODERATOR", description: "Moderator user", updatedAt: new Date() },
		{ name: "ADMIN", description: "Administrator", updatedAt: new Date() },
		{
			name: "SUPER_ADMIN",
			description: "Super Administrator",
			updatedAt: new Date(),
		},
	];

	for (const role of roles) {
		await prisma.role.create({
			data: role,
		});
	}

	console.log("Seed data populated successfully.");
}

async function addUserWithRoleMapping() {
	try {
		const superAdminRole = await prisma.role.findUnique({
			where: {
				name: "SUPER_ADMIN",
			},
		});

		if (!superAdminRole) {
			throw new Error("Super Admin role not found");
		}

		const newUser = await prisma.user.create({
			data: {
				userName: "Admin",
				email: "admin1122@gmail.com",
				password: bcrypt.hashSync("Admin1122", 8),
				isAccountAcive: true,
				updatedAt: new Date(),
			},
		});

		if (!newUser) {
			throw new Error(
				"Something went wrong; the Super Admin creation process failed."
			);
		}

		const roleMapping = await prisma.roleMapping.create({
			data: {
				userId: newUser.id,
				roleId: superAdminRole.id,
				updatedAt: new Date(),
			},
		});

		if (!roleMapping) {
			throw new Error(
				"Something went wrong; the Super Admin role mapping creation process failed."
			);
		}

		console.log("New user added with Super Admin role:", newUser);
	} catch (error) {
		console.error("Error adding user with role mapping:", error);
		throw error;
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
