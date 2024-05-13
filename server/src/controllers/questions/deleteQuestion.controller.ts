import { db } from "@database";
import { NotFoundError } from "@middleware/errors";
import { RequestHandler } from "express";

export const deleteQuestionController: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		const { id } = req.params;

		// check if question existed first
		const question = await db
			.selectFrom("questions")
			.selectAll()
			.where("id", "==", +id)
			.execute();

		if (question.length <= 0) throw new NotFoundError("Question not found.");

		await db.deleteFrom("questions").where("id", "==", +id).execute();

		return res.status(204).end();
	} catch (err) {
		next(err);
	}
};
