import { db } from "@database";
import { BadRequestError, NotFoundError } from "@middleware/errors";
import { RequestHandler } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import bcrypt from "bcrypt";
import { secrets } from "@utils/secrets";
import jwt from "jsonwebtoken";

export const LoginUserController: RequestHandler = async (req, res, next) => {
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

		const user = await db
			.selectFrom("users")
			.selectAll()
			.where("username", "==", sanitizedBody.data.username)
			.execute();

		if (user.length <= 0) throw new NotFoundError("Incorrect credentials.");

		// check if password is correct
		const isPasswordCorrect = await bcrypt.compare(
			sanitizedBody.data.password,
			user[0].password
		);

		if (!isPasswordCorrect) throw new BadRequestError("Incorrect credentials");

		const token = jwt.sign({ id: user[0].id }, secrets.JWT_SECRET, {
			expiresIn: "never",
		});

		res.send(token);
	} catch (err) {
		next(err);
	}
};
