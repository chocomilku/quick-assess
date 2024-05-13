import { db } from "@database";
import {
	BadRequestError,
	InternalServerError,
	NotFoundError,
} from "@middleware/errors";
import { RequestHandler } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export const updateQuestionController: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		const { id } = req.params;
		const rawBody = req.body;

		// check if question existed
		const question = await db
			.selectFrom("questions")
			.selectAll()
			.where("id", "==", +id)
			.execute();

		if (question.length <= 0) throw new NotFoundError("Question not found.");

		const sanitizedBody = z
			.object({
				question: z.string(),
			})
			.safeParse(rawBody);

		if (!sanitizedBody.success)
			throw new BadRequestError(fromZodError(sanitizedBody.error).message);

		const updateQuestion = await db
			.updateTable("questions")
			.where("id", "==", +id)
			.set({
				question: sanitizedBody.data.question,
			})
			.executeTakeFirstOrThrow();

		if (updateQuestion.numUpdatedRows <= 0)
			throw new InternalServerError("Question not updated");

		return res.status(200).json({ updated: +id, ...sanitizedBody.data });
	} catch (err) {
		next(err);
	}
};
