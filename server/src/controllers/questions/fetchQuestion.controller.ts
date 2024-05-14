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
			.innerJoin("category", "category.id", "questions.categoryId")
			.where("questions.id", "==", +id)
			.select([
				"questions.id",
				"questions.gameId",
				"questions.categoryId",
				"questions.question",
				"category.text",
				"category.points",
				"category.color",
			])
			.execute();

		if (questions.length === 0) throw new NotFoundError("Question not found");

		return res.status(200).json(questions);
	} catch (err) {
		next(err);
	}
};
