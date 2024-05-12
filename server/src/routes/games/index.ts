import { Router } from "express";
import { fetchGamesController } from "@controllers/games/fetchGames.controller";
import { fetchGameController } from "@controllers/games/fetchGame.controller";
import { fetchQuestionsByGameController } from "@controllers/questions/fetchQuestionsByGame.controller";
import { fetchCategoryByGameController } from "@controllers/category/fetchCategoryByGame.controller";

const router = Router();

router.get("/:id/category", fetchCategoryByGameController);
router.get("/:id/questions", fetchQuestionsByGameController);
router.get("/:id", fetchGameController);
router.get("/", fetchGamesController);

export default router;
