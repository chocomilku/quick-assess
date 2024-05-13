import { db } from "@database";
import { RequestHandler } from "express";

export const fetchAnswersByQuestionController: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		const { id } = req.params;

		const answers = await db
			.selectFrom("answers")
			.where("questionId", "==", +id)
			.selectAll()
			.execute();

		return res.status(200).json(answers);
	} catch (err) {
		next(err);
	}
};
