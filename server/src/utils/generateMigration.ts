import { dbMigrationConfigLogger } from "@config/logging/db.logger";
import fs from "fs";
import path from "path";

const MIGRATION_PATH = path.join(
	process.cwd(),
	"src",
	"database",
	"migrations"
);

if (!process.argv[2]) {
	dbMigrationConfigLogger.error("Error: Please provide a migration name");
	process.exit(1);
}

const migrationName = process.argv[2];

const fileName = `${new Date()
	.toISOString()
	.replace(/:/g, "-")}_${migrationName}.ts`;
const fileContent = `import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  // Migration code
}

export async function down(db: Kysely<any>): Promise<void> {
  // Migration code
}`;

fs.writeFileSync(path.join(MIGRATION_PATH, fileName), fileContent);

dbMigrationConfigLogger.success(`Successfully created ${fileName}.`);
