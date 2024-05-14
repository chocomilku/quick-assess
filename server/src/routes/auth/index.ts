import { CreateUserController } from "@controllers/user/createUser.controller";
import { LoginUserController } from "@controllers/user/loginUser.controller";
import { secrets } from "@utils/secrets";
import { Router } from "express";

const router = Router();

router.post("/login", LoginUserController);

if (!secrets.DISABLE_REGISTER) {
	router.post("/register", CreateUserController);
}

export default router;
