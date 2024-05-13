import { config } from "dotenv";
import { cleanEnv, str } from "envalid";
import path from "path";

config({ path: path.join(process.cwd(), "..", ".env") });

export const secrets = cleanEnv(process.env, {
	JWT_SECRET: str(),
});
