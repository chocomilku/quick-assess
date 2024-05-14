import { fetchAnswerController } from "@controllers/answers/fetchAnswer.controller";
import { updateAnswerStatusController } from "@controllers/answers/updateAnswerStatus.controller";
import { AuthMiddleware } from "@middleware/user/auth.middleware";
import { Router } from "express";

const router = Router();

router.get("/:id", fetchAnswerController);

router.put("/:id", AuthMiddleware, updateAnswerStatusController);

export default router;
