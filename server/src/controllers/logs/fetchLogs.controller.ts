import { db } from "@database";
import { BadRequestError } from "@middleware/errors";
import { RequestHandler } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export const fetchLogsController: RequestHandler = async (req, res, next) => {
	try {
		const rawQuery = req.query;

		const query = z
			.object({
				limit: z.number().optional(),
				offset: z.number().optional(),
			})
			.safeParse(rawQuery);

		if (!query.success)
			throw new BadRequestError(fromZodError(query.error).message);

		let limit = query.data.limit ?? 10;
		let offset = query.data.offset ?? 0;

		const logs = await db
			.selectFrom("logs")
			.selectAll()
			.limit(limit)
			.offset(offset)
			.orderBy("id", "desc")
			.execute();

		return res.status(200).json(logs);
	} catch (err) {
		next(err);
	}
};
