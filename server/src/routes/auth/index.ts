import { CreateUserController } from "@controllers/user/createUser.controller";
import { LoginUserController } from "@controllers/user/loginUser.controller";
import { Router } from "express";

const router = Router();

router.post("/register", CreateUserController);
router.post("/login", LoginUserController);

export default router;
