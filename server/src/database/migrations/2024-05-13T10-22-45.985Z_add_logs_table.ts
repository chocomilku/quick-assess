import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("logs")
		.addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
		.addColumn("timestamp", "text", (col) =>
			col.defaultTo(sql`(datetime('now'))`).notNull()
		)
		.addColumn("action", "text", (col) => col.notNull())
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("logs").execute();
}
