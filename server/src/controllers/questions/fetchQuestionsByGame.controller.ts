import { db } from "@database";
import { RequestHandler } from "express";

export const fetchQuestionsByGameController: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		const { id } = req.params;

		const questions = await db
			.selectFrom("questions")
			.innerJoin("category", "category.id", "questions.categoryId")
			.where("questions.gameId", "==", +id)
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

		return res.status(200).json(questions);
	} catch (err) {
		next(err);
	}
};
