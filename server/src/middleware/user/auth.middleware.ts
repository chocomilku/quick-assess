import { ForbiddenError, UnauthorizedError } from "@middleware/errors";
import { secrets } from "@utils/secrets";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const AuthMiddleware: RequestHandler = async (req, res, next) => {
	try {
		let token: string | undefined = undefined;

		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			token = req.headers.authorization.split(" ")[1];
		} else if (req.cookies.token) {
			token = req.cookies.token;
		}

		if (!token) throw new UnauthorizedError();

		jwt.verify(token, secrets.JWT_SECRET, (err) => {
			if (err) throw new ForbiddenError();
			next();
		});
	} catch (err) {
		next(err);
	}
};
