import * as path from "path";
import { promises as fs } from "fs";
import { Migrator, FileMigrationProvider } from "kysely";
import { db } from "@database";
import { dbMigrationLogger } from "@config/logging/db.logger";

async function revertLatestMigration() {
	const migrator = new Migrator({
		db,
		provider: new FileMigrationProvider({
			fs,
			path,
			migrationFolder: path.join(
				process.cwd(),
				"src",
				"database",
				"migrations"
			),
		}),
	});

	dbMigrationLogger.await("Reverting migration started.");
	const { error, results } = await migrator.migrateDown();

	results?.forEach((result) => {
		if (result.status === "Success") {
			dbMigrationLogger.success(
				`Reverted ${result.migrationName} successfully`
			);
		} else if (result.status === "Error") {
			dbMigrationLogger.error(`Failed to revert ${result.migrationName}`);
		}
	});

	if (error) {
		dbMigrationLogger.fatal("Reverting latest migration failed");
		console.error(error);
		await db.destroy();
		process.exit(1);
	} else {
		await db.destroy();
		process.exit(0);
	}
}

revertLatestMigration();
