import { db } from "@database";
import { NotFoundError } from "@middleware/errors";
import { RequestHandler } from "express";

export const fetchCategoryController: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		const { id } = req.params;

		const category = await db
			.selectFrom("category")
			.where("id", "==", +id)
			.selectAll()
			.execute();

		if (category.length === 0) throw new NotFoundError("Category not found");

		return res.status(200).json(category);
	} catch (err) {
		next(err);
	}
};
