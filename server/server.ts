import { serverLogger } from "@config/logging/server.logger";
import app from "./src/app";
import migrateToLatest from "./src/database/startupMigration";

const PORT = 3000;
const skipDb = process.argv.includes("--skip-db");

const main = async () => {
	// kysely migration
	if (!skipDb) await migrateToLatest();

	// start server
	app.listen(PORT, () => {
		serverLogger.start(`Server is running at http://localhost:${PORT}`);
	});
};

main();
