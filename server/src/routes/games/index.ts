import { Router } from "express";
import { fetchGamesController } from "@controllers/games/fetchGames.controller";
import { fetchGameController } from "@controllers/games/fetchGame.controller";
import { fetchQuestionsByGameController } from "@controllers/questions/fetchQuestionsByGame.controller";
import { fetchCategoryByGameController } from "@controllers/category/fetchCategoryByGame.controller";
import { addGameController } from "@controllers/games/addGame.controller";
import { updateGameStatusController } from "@controllers/games/updateGameStatus.controller";
import { updateGameController } from "@controllers/games/updateGame.controller";
import { deleteGameController } from "@controllers/games/deleteGame.controller";
import { addQuestionController } from "@controllers/questions/addQuestion.controller";
import { addCategoryController } from "@controllers/category/addCategory.controller";
import { AuthMiddleware } from "@middleware/user/auth.middleware";

const router = Router();

router.get("/:id/category", fetchCategoryByGameController);
router.get("/:id/questions", fetchQuestionsByGameController);
router.get("/:id", fetchGameController);
router.get("/", fetchGamesController);

router.post("/", AuthMiddleware, addGameController);
router.post("/:gameId/questions", AuthMiddleware, addQuestionController);
router.post("/:gameId/category", AuthMiddleware, addCategoryController);

router.patch("/:id", AuthMiddleware, updateGameStatusController);

router.put("/:id", AuthMiddleware, updateGameController);

router.delete("/:id", AuthMiddleware, deleteGameController);

export default router;
