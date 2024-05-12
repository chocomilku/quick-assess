import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	// add game table
	await db.schema
		.createTable("games")
		.addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
		.addColumn("isRunning", "integer", (col) =>
			col
				.notNull()
				.check(sql`isRunning IN (0, 1)`)
				.defaultTo(0)
		)
		.addColumn("name", "text", (col) => col.notNull())
		.execute();

	// add trigger to check running games
	await sql`CREATE TRIGGER ensure_single_running_game
    BEFORE UPDATE OF isRunning ON games
    FOR EACH ROW
    BEGIN
      SELECT CASE
        WHEN NEW.isRunning = 1 AND (SELECT COUNT(*) FROM games WHERE isRunning = 1) > 0 THEN
          RAISE (ABORT, 'Only one game can be running at a time')
      END;
    END;`.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
	// remove game table
	await db.schema.dropTable("games").execute();

	// remove trigger to check running games
	await sql`DROP TRIGGER IF EXISTS ensure_single_running_game;`.execute(db);
}
