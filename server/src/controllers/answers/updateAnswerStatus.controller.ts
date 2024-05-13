import { db } from "@database";
import { booleanToNumber } from "@helpers/booleanToNumber";
import { logAction } from "@helpers/logging/log";
import { BadRequestError, NotFoundError } from "@middleware/errors";
import { RequestHandler } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export const updateAnswerStatusController: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		const { id } = req.params;
		const rawBody = req.body;

		// check if answer exists
		const answer = await db
			.selectFrom("answers")
			.where("id", "==", +id)
			.selectAll()
			.execute();

		if (answer.length <= 0) throw new NotFoundError("Answer not found");

		const sanitizedBody = z
			.object({
				isPass: z.boolean().nullable(),
			})
			.safeParse(rawBody);

		if (!sanitizedBody.success)
			throw new BadRequestError(fromZodError(sanitizedBody.error).message);

		let query = db.updateTable("answers").where("id", "==", +id);

		if (sanitizedBody.data.isPass === null) {
			query = query.set({
				isPass: null,
			});
		} else {
			query = query.set({
				isPass: booleanToNumber(sanitizedBody.data.isPass),
			});
		}

		const updatedAnswer = await query.executeTakeFirstOrThrow();

		if (updatedAnswer.numUpdatedRows <= 0)
			throw new NotFoundError("Answer not updated");

		logAction(
			`Answer ${id} status has been updated to ${sanitizedBody.data.isPass}`
		);

		return res.status(200).json({ updated: +id, ...sanitizedBody.data });
	} catch (err) {
		next(err);
	}
};
