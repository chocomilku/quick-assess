import { CheckAuthStatusController } from "@controllers/user/checkAuthStatus.controller";
import { CookieLogoutUserController } from "@controllers/user/cookieLogoutUser.controller";
import { CreateUserController } from "@controllers/user/createUser.controller";
import { LoginUserController } from "@controllers/user/loginUser.controller";
import { AuthMiddleware } from "@middleware/user/auth.middleware";
import { secrets } from "@utils/secrets";
import { Router } from "express";

const router = Router();

router.get("/status", AuthMiddleware, CheckAuthStatusController);

router.post("/login", LoginUserController);
router.post("/logout", CookieLogoutUserController);

if (!secrets.DISABLE_REGISTER) {
	router.post("/register", CreateUserController);
}

export default router;
