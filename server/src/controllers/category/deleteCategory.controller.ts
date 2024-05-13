import { db } from "@database";
import { NotFoundError } from "@middleware/errors";
import { RequestHandler } from "express";

export const deleteCategoryController: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		const { id } = req.params;

		// check if category existed first
		const category = await db
			.selectFrom("category")
			.selectAll()
			.where("id", "==", +id)
			.execute();

		if (category.length <= 0) throw new NotFoundError("Category not found.");

		await db.deleteFrom("questions").where("categoryId", "==", +id).execute();

		await db.deleteFrom("category").where("id", "==", +id).execute();

		return res.status(204).end();
	} catch (err) {
		next(err);
	}
};
