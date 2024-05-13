import { db } from "@database";
import { NotFoundError } from "@middleware/errors";
import { RequestHandler } from "express";

export const fetchAnswerController: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.params;

		const answers = await db
			.selectFrom("answers")
			.where("id", "==", +id)
			.selectAll()
			.execute();

		if (answers.length === 0) throw new NotFoundError("Answer not found");

		return res.status(200).json(answers);
	} catch (err) {
		next(err);
	}
};
