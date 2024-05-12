import { Kysely, SqliteDialect } from "kysely";
import SQLite from "better-sqlite3";
import path from "path";
import { AppDatabase } from "@interfaces/db";

const dialect = new SqliteDialect({
	database: new SQLite(path.join(process.cwd(), "../", "database.db")),
});

export const db = new Kysely<AppDatabase>({ dialect });
