import { RequestHandler } from "express";

export const CookieLogoutUserController: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		res.clearCookie("token");
		return res.status(200).json({ message: "Successfully logged out" });
	} catch (err) {
		next(err);
	}
};
