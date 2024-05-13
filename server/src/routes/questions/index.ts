import { Router } from "express";
import { fetchQuestionController } from "@controllers/questions/fetchQuestion.controller";

const router = Router();

router.use("/:id", fetchQuestionController);

export default router;
