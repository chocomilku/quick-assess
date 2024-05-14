import { db } from "@database";
import { RequestHandler } from "express";

export const fetchQuestionsByCategoryController: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		const { id } = req.params;

		const questions = await db
			.selectFrom("questions")
			.where("categoryId", "==", +id)
			.selectAll()
			.execute();

		return res.status(200).json(questions);
	} catch (err) {
		next(err);
	}
};
