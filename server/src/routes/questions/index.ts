import { Router } from "express";
import { fetchQuestionController } from "@controllers/questions/fetchQuestion.controller";
import { updateQuestionController } from "@controllers/questions/updateQuestion.controller";
import { deleteQuestionController } from "@controllers/questions/deleteQuestion.controller";

const router = Router();

router.get("/:id", fetchQuestionController);

router.put("/:id", updateQuestionController);

router.delete("/:id", deleteQuestionController);

export default router;
