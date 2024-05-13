import { db } from "@database";
import { logAction } from "@helpers/logging/log";
import { BadRequestError } from "@middleware/errors";
import { RequestHandler } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export const addCategoryController: RequestHandler = async (req, res, next) => {
	try {
		const { gameId } = req.params;
		const body = req.body;

		const sanitizedBody = z
			.object({
				gameId: z.coerce.number(),
				text: z.string(),
				points: z.coerce.number(),
				color: z.string(),
			})
			.safeParse({ gameId, ...body });

		if (!sanitizedBody.success)
			throw new BadRequestError(fromZodError(sanitizedBody.error).message);

		const addCategory = await db
			.insertInto("category")
			.values({
				gameId: sanitizedBody.data.gameId,
				text: sanitizedBody.data.text,
				points: sanitizedBody.data.points,
				color: sanitizedBody.data.color,
			})
			.executeTakeFirstOrThrow();

		logAction(`Category ${Number(addCategory.insertId)} has been added.`);

		return res.status(201).json({ added: Number(addCategory.insertId) });
	} catch (err) {
		next(err);
	}
};
