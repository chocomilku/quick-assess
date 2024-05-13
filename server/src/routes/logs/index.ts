import { fetchLogsController } from "@controllers/logs/fetchLogs.controller";
import { Router } from "express";

const router = Router();

router.get("/", fetchLogsController);

export default router;
