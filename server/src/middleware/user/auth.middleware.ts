import { ForbiddenError, UnauthorizedError } from "@middleware/errors";
import { secrets } from "@utils/secrets";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const AuthMiddleware: RequestHandler = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		const token = authHeader && authHeader.split(" ")[1];

		if (token == null) throw new UnauthorizedError();

		jwt.verify(token, secrets.JWT_SECRET, (err) => {
			if (err) throw new ForbiddenError();
			next();
		});
	} catch (err) {
		next(err);
	}
};
