import { Router } from "express";
import { fetchQuestionController } from "@controllers/questions/fetchQuestion.controller";
import { updateQuestionController } from "@controllers/questions/updateQuestion.controller";
import { deleteQuestionController } from "@controllers/questions/deleteQuestion.controller";
import { addAnswerController } from "@controllers/answers/addAnswer.controller";
import { fetchAnswersByQuestionController } from "@controllers/answers/fetchAnswersByQuestion.controller";

const router = Router();

router.get("/:id", fetchQuestionController);
router.get("/:id/answers", fetchAnswersByQuestionController);

router.post("/:id/answer", addAnswerController);

router.put("/:id", updateQuestionController);

router.delete("/:id", deleteQuestionController);

export default router;
