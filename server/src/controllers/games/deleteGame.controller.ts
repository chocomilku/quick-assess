import { db } from "@database";
import { BadRequestError, NotFoundError } from "@middleware/errors";
import { RequestHandler } from "express";

export const deleteGameController: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.params;

		// check if game existed first
		const game = await db
			.selectFrom("games")
			.selectAll()
			.where("id", "==", +id)
			.execute();

		if (game.length <= 0) throw new NotFoundError("Game not found.");

		if (game[0].isRunning)
			throw new BadRequestError("Cannot delete a game that is running.");

		await db.deleteFrom("questions").where("gameId", "==", +id).execute();

		await db.deleteFrom("category").where("gameId", "==", +id).execute();

		await db.deleteFrom("games").where("id", "==", +id).execute();

		return res.status(204).end();
	} catch (err) {
		next(err);
	}
};
