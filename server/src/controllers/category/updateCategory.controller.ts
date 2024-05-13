import { db } from "@database";
import { logAction } from "@helpers/logging/log";
import {
	BadRequestError,
	InternalServerError,
	NotFoundError,
} from "@middleware/errors";
import { RequestHandler } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export const updateCategoryController: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		const { id } = req.params;
		const rawBody = req.body;

		// check if category existed first
		const category = await db
			.selectFrom("category")
			.selectAll()
			.where("id", "==", +id)
			.execute();

		if (category.length <= 0) throw new NotFoundError("Category not found.");

		const sanitizedBody = z
			.object({
				text: z.string(),
				points: z.coerce.number(),
				color: z.string(),
			})
			.safeParse(rawBody);

		if (!sanitizedBody.success)
			throw new BadRequestError(fromZodError(sanitizedBody.error).message);

		const updateCategory = await db
			.updateTable("category")
			.where("id", "==", +id)
			.set({
				text: sanitizedBody.data.text,
				points: sanitizedBody.data.points,
				color: sanitizedBody.data.color,
			})
			.executeTakeFirstOrThrow();

		if (updateCategory.numUpdatedRows <= 0)
			throw new InternalServerError("Category not updated");

		logAction(`Category ${id} has been updated.`);

		return res.status(200).json({ updated: +id, ...sanitizedBody.data });
	} catch (err) {
		next(err);
	}
};
