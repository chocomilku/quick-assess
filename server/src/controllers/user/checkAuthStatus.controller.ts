import { RequestHandler } from "express";

export const CheckAuthStatusController: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		res.status(200).json({
			success: true,
			message: "Authorized",
		});
	} catch (err) {
		next(err);
	}
};
