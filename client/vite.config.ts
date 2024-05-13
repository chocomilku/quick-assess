import { defineConfig, loadEnv } from "vite";
import fs from "fs";
import path from "path";
import react from "@vitejs/plugin-react-swc";

const envFilePath = path.resolve(__dirname, "..", ".env");
if (!fs.existsSync(envFilePath)) {
	throw new Error(`Could not find .env file at ${envFilePath}`);
}

export default defineConfig(({ command, mode }) => {
	return {
		plugins: [react()],
		envDir: path.dirname(envFilePath),
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
	};
});
