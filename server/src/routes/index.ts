import { Router } from "express";
import gamesRouter from "./games";

const router = Router();

router.get("/", (req, res) => {
	res.json({ message: "Hello World" });
});

router.use("/games", gamesRouter);

export default router;
