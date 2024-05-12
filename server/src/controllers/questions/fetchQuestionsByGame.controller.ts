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
			.where("gameId", "==", +id)
			.selectAll()
			.execute();

		return res.status(200).json(questions);
	} catch (err) {
		next(err);
	}
};
