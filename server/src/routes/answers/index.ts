import { fetchAnswerController } from "@controllers/answers/fetchAnswer.controller";
import { updateAnswerStatusController } from "@controllers/answers/updateAnswerStatus.controller";
import { Router } from "express";

const router = Router();

router.get("/:id", fetchAnswerController);

router.put("/:id", updateAnswerStatusController);

export default router;
