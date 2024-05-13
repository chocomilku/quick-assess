import { db } from "@database";
import { booleanToNumber } from "@helpers/booleanToNumber";
import { BadRequestError } from "@middleware/errors";
import { RequestHandler } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export const fetchGamesController: RequestHandler = async (req, res, next) => {
	try {
		const rawQuery = req.query;

		// fix: coerce boolean
		const query = z
			.object({
				active: z
					.string()
					.refine((val) => val === "true" || val === "false")
					.transform((val) => val === "true")
					.optional(),
				limit: z.number().optional(),
				offset: z.number().optional(),
			})
			.safeParse(rawQuery);

		if (!query.success) {
			const formattedError = fromZodError(query.error);
			throw new BadRequestError(formattedError.message);
		}

		let active = query.data.active;
		let limit = query.data.limit ?? 5;
		let offset = query.data.offset ?? 0;

		let dbQuery = db
			.selectFrom("games")
			.selectAll()
			.limit(limit)
			.offset(offset);

		if (active !== undefined) {
			dbQuery = dbQuery.where("isRunning", "==", booleanToNumber(active));
		}

		const games = await dbQuery.execute();

		// TODO: enable foreign key constraints PRAGMA foreign_key = 1; i thinkk

		return res.status(200).json(games);
	} catch (err) {
		next(err);
	}
};
