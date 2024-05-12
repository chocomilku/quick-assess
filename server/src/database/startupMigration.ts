import * as path from "path";
import { promises as fs } from "fs";
import { Migrator, FileMigrationProvider } from "kysely";
import { db } from ".";
import { dbMigrationLogger } from "@config/logging/db.logger";

async function migrateToLatest() {
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

	dbMigrationLogger.await("Migration started.");
	const { error, results } = await migrator.migrateToLatest();

	results?.forEach((result) => {
		if (result.status === "Success") {
			dbMigrationLogger.success(
				`Migrated ${result.migrationName} successfully`
			);
		} else if (result.status === "Error") {
			dbMigrationLogger.error(`Failed to migrate ${result.migrationName}`);
		}
	});

	if (error) {
		dbMigrationLogger.fatal("Migration to latest failed");
		console.error(error);
		process.exit(1);
	}
}

export default migrateToLatest;
