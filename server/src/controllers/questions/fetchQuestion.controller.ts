import { db } from "@database";
import { NotFoundError } from "@middleware/errors";
import { RequestHandler } from "express";

export const fetchQuestionController: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		const { id } = req.params;

		const questions = await db
			.selectFrom("questions")
			.where("id", "==", +id)
			.selectAll()
			.execute();

		if (questions.length === 0) throw new NotFoundError("Question not found");

		return res.status(200).json(questions);
	} catch (err) {
		next(err);
	}
};
