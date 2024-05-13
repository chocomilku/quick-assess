import { db } from "@database";
import { BadRequestError } from "@middleware/errors";
import { RequestHandler } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export const addQuestionController: RequestHandler = async (req, res, next) => {
	try {
		const { gameId } = req.params;
		const body = req.body;

		const sanitizedBody = z
			.object({
				gameId: z.coerce.number(),
				categoryId: z.coerce.number(),
				question: z.string(),
			})
			.safeParse({ gameId, ...body });

		if (!sanitizedBody.success)
			throw new BadRequestError(fromZodError(sanitizedBody.error).message);

		const addQuestion = await db
			.insertInto("questions")
			.values({
				gameId: sanitizedBody.data.gameId,
				categoryId: sanitizedBody.data.categoryId,
				question: sanitizedBody.data.question,
			})
			.executeTakeFirstOrThrow();

		return res.status(201).json({ added: Number(addQuestion.insertId) });
	} catch (err) {
		next(err);
	}
};
