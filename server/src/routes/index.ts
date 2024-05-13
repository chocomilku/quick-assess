import { Router } from "express";
import gamesRouter from "./games";
import categoryRouter from "./category";
import questionsRouter from "./questions";
import answersRouter from "./answers";
import logsRouter from "./logs";

const router = Router();

router.get("/", (req, res) => {
	res.json({ message: "Hello World" });
});

router.use("/games", gamesRouter);
router.use("/category", categoryRouter);
router.use("/questions", questionsRouter);
router.use("/answers", answersRouter);
router.use("/logs", logsRouter);

export default router;
