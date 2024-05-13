import { RequestHandler } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { BadRequestError } from "@middleware/errors";
import { fromZodError } from "zod-validation-error";
import { db } from "@database";
import { logAction } from "@helpers/logging/log";

export const CreateUserController: RequestHandler = async (req, res, next) => {
	const SALT_ROUNDS = 10;

	try {
		const rawBody = req.body;

		const sanitizedBody = z
			.object({
				username: z.string().min(3).max(255),
				password: z.string().min(8).max(255),
			})
			.safeParse(rawBody);

		if (!sanitizedBody.success)
			throw new BadRequestError(fromZodError(sanitizedBody.error).message);

		const checkIfUserExists = await db
			.selectFrom("users")
			.selectAll()
			.where("username", "==", sanitizedBody.data.username)
			.execute();

		if (
			checkIfUserExists.length > 0 &&
			checkIfUserExists[0].username === sanitizedBody.data.username
		) {
			throw new BadRequestError("Username already exists.");
		}

		const hashedPassword = await bcrypt.hash(
			sanitizedBody.data.password,
			SALT_ROUNDS
		);

		const addUser = await db
			.insertInto("users")
			.values({
				username: sanitizedBody.data.username,
				password: hashedPassword,
			})
			.executeTakeFirstOrThrow();

		logAction(`User ${Number(addUser.insertId)} has been added.`);

		return res.status(201).json({ message: "User created successfully." });
	} catch (err) {
		next(err);
	}
};
