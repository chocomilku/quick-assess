import { db } from "@database";
import { booleanToNumber } from "@helpers/booleanToNumber";
import { BadRequestError, InternalServerError } from "@middleware/errors";
import { RequestHandler } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import sqlite from "better-sqlite3";

export const updateGameStatusController: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		const { id } = req.params;
		const rawBody = req.body;

		const sanitizedBody = z
			.object({
				isRunning: z.boolean(),
			})
			.safeParse(rawBody);

		if (!sanitizedBody.success)
			throw new BadRequestError(fromZodError(sanitizedBody.error).message);

		const updatedGame = await db
			.updateTable("games")
			.set({
				isRunning: booleanToNumber(sanitizedBody.data.isRunning),
			})
			.where("id", "==", +id)
			.executeTakeFirstOrThrow();

		if (updatedGame.numUpdatedRows <= 0)
			throw new InternalServerError("Game not updated");

		return res.status(200).json({ updated: +id, ...sanitizedBody.data });
	} catch (err) {
		if (err instanceof sqlite.SqliteError) {
			if (
				err.code == "SQLITE_CONSTRAINT_TRIGGER" &&
				err.message.includes("Only one game")
			) {
				return next(new BadRequestError(err.message));
			}
		}

		next(err);
	}
};
