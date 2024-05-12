import { Router } from "express";
import { fetchGamesController } from "@controllers/games/fetchGames.controller";

const router = Router();

router.get("/", fetchGamesController);

export default router;
