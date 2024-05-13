import { db } from "@database";
import { BadRequestError } from "@middleware/errors";
import { RequestHandler } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export const addGameController: RequestHandler = async (req, res, next) => {
	try {
		const body = req.body;

		const sanitizedBody = z
			.object({
				name: z.string(),
			})
			.safeParse(body);

		if (!sanitizedBody.success) {
			const formattedError = fromZodError(sanitizedBody.error);
			throw new BadRequestError(formattedError.message);
		}

		const addGame = await db
			.insertInto("games")
			.values({
				name: sanitizedBody.data.name,
			})
			.executeTakeFirstOrThrow();

		return res.status(201).json({ added: Number(addGame.insertId) });
	} catch (err) {
		next(err);
	}
};
