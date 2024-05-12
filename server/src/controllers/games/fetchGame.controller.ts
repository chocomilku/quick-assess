import { db } from "@database";
import { NotFoundError } from "@middleware/errors";
import { RequestHandler } from "express";

export const fetchGameController: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.params;

		const game = await db
			.selectFrom("games")
			.where("id", "==", +id)
			.selectAll()
			.execute();

		if (game.length === 0) throw new NotFoundError("Game not found");

		return res.status(200).json(game);
	} catch (err) {
		next(err);
	}
};
