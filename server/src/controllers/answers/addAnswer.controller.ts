import { db } from "@database";
import { logAction } from "@helpers/logging/log";
import { BadRequestError, NotFoundError } from "@middleware/errors";
import { RequestHandler } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export const addAnswerController: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.params;
		const rawBody = req.body;

		// check if question exists
		const question = await db
			.selectFrom("questions")
			.selectAll()
			.where("id", "==", +id)
			.execute();

		if (question.length <= 0) {
			throw new NotFoundError("Question not found.");
		}

		const sanitizedBody = z
			.object({
				answer: z.string(),
				author: z.string(),
				questionId: z.number(),
				categoryId: z.number(),
				gameId: z.number(),
			})
			.safeParse({
				questionId: +id,
				categoryId: question[0].categoryId,
				gameId: question[0].gameId,
				...rawBody,
			});

		if (!sanitizedBody.success)
			throw new BadRequestError(fromZodError(sanitizedBody.error).message);

		const addAnswer = await db
			.insertInto("answers")
			.values({
				answer: sanitizedBody.data.answer,
				author: sanitizedBody.data.author,
				questionId: sanitizedBody.data.questionId,
				categoryId: sanitizedBody.data.categoryId,
				gameId: sanitizedBody.data.gameId,
			})
			.executeTakeFirstOrThrow();

		logAction(
			`${sanitizedBody.data.author} added an answer to question ${sanitizedBody.data.questionId}`
		);

		return res.status(201).json({ added: Number(addAnswer.insertId) });
	} catch (err) {
		next(err);
	}
};
