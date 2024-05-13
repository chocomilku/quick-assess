import { db } from "@database";
import { booleanToNumber } from "@helpers/booleanToNumber";
import { BadRequestError, InternalServerError } from "@middleware/errors";
import { RequestHandler } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import sqlite from "better-sqlite3";
import { logAction } from "@helpers/logging/log";

export const updateGameController: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.params;
		const rawBody = req.body;

		const sanitizedBody = z
			.object({
				name: z.string(),
				isRunning: z.boolean().optional(),
			})
			.safeParse(rawBody);

		if (!sanitizedBody.success)
			throw new BadRequestError(fromZodError(sanitizedBody.error).message);

		let dbQuery = db.updateTable("games").where("id", "==", +id);

		if (sanitizedBody.data.isRunning !== undefined) {
			dbQuery = dbQuery.set({
				name: sanitizedBody.data.name,
				isRunning: booleanToNumber(sanitizedBody.data.isRunning),
			});
		} else {
			dbQuery = dbQuery.set({
				name: sanitizedBody.data.name,
			});
		}

		const updatedGame = await dbQuery.executeTakeFirstOrThrow();

		if (updatedGame.numUpdatedRows <= 0)
			throw new InternalServerError("Game not updated");

		logAction(`Game ${id} has been updated.`);

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
