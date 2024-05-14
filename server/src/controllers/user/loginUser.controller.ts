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
		const query = req.query;

		const sanitizedQuery = z
			.object({
				response_format: z
					.union([z.literal("cookie"), z.literal("token")])
					.optional()
					.default("token"),
			})
			.safeParse(query);

		if (!sanitizedQuery.success)
			throw new BadRequestError(fromZodError(sanitizedQuery.error).message);

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

		const token = jwt.sign(
			{ id: user[0].id, username: sanitizedBody.data.username },
			secrets.JWT_SECRET,
			{
				expiresIn: "1d",
			}
		);

		if (sanitizedQuery.data.response_format === "cookie") {
			res.cookie("token", token, {
				maxAge: 1000 * 60 * 60 * 24,
				httpOnly: true,
				sameSite: "strict",
			});
			return res.status(200).json({
				message: "Successfully logged in.",
			});
		} else if (sanitizedQuery.data.response_format === "token") {
			return res.status(200).json({
				token,
			});
		}
	} catch (err) {
		next(err);
	}
};
