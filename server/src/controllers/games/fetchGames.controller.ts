import { db } from "@database";
import { booleanToNumber } from "@helpers/booleanToNumber";
import { BadRequestError } from "@middleware/errors";
import { RequestHandler } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export const fetchGamesController: RequestHandler = async (req, res, next) => {
	try {
		const rawQuery = req.query;
		console.log(rawQuery);

		// fix: coerce boolean
		const query = z
			.object({
				active: z.coerce.boolean().optional(),
				limit: z.number().optional(),
				offset: z.number().optional(),
			})
			.safeParse(rawQuery);

		if (!query.success) {
			const formattedError = fromZodError(query.error);
			throw new BadRequestError(formattedError.message);
		}

		console.log(query.data);

		let active = query.data.active ?? false;
		let limit = query.data.limit ?? 5;
		let offset = query.data.offset ?? 0;

		const games = await db
			.selectFrom("games")
			.where("isRunning", "==", booleanToNumber(active))
			.selectAll()
			.limit(limit)
			.offset(offset)
			.execute();

		// TODO: enable foreign key constraints PRAGMA foreign_key = 1; i thinkk

		return res.status(200).json(games);
	} catch (err) {
		next(err);
	}
};
