import { config } from "dotenv";
import { bool, cleanEnv, str } from "envalid";
import path from "path";

config({ path: path.join(process.cwd(), "..", ".env") });

export const secrets = cleanEnv(process.env, {
	JWT_SECRET: str(),
	DISABLE_REGISTER: bool(),
});
