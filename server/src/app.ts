import express from "express";
import cors from "cors";
import logging from "@middleware/logging.middleware";

import routes from "@routes";
import { NotFoundError } from "@middleware/errors";
import handleErrors from "@middleware/errors/handleErrors.middleware";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(logging);

app.use("/api", routes);

app.use("*", (req, res, next) => {
	next(new NotFoundError("Route not found"));
});

app.use(handleErrors);

export default app;
