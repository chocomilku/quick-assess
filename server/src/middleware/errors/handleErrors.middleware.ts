import { ErrorRequestHandler } from "express";
import { HTTPError } from ".";

const handleErrors: ErrorRequestHandler = (err, req, res, next) => {
	if (err instanceof HTTPError) {
		res.status(err.status).json({ error: err.message });
		if (err.status >= 500) {
			console.error(err);
		}
	} else {
		res.status(500).json({ error: "Something went wrong." });
		console.error(err);
	}
};

export default handleErrors;
