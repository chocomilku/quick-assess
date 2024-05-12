import { Router } from "express";
import { fetchGamesController } from "@controllers/games/fetchGames.controller";
import { fetchGameController } from "@controllers/games/fetchGame.controller";

const router = Router();

router.get("/:id", fetchGameController);
router.get("/", fetchGamesController);

export default router;
