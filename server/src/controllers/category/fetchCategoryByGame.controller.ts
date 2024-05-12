import { db } from "@database";
import { RequestHandler } from "express";

export const fetchCategoryByGameController: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		const { id } = req.params;

		const categories = await db
			.selectFrom("category")
			.where("gameId", "==", +id)
			.selectAll()
			.execute();

		return res.status(200).json(categories);
	} catch (err) {
		next(err);
	}
};
