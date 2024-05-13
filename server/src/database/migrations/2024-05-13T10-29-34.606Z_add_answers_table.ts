import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("answers")
		.addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
		.addColumn("timestamp", "text", (col) =>
			col.defaultTo(sql`(datetime('now'))`).notNull()
		)
		.addColumn("answer", "text", (col) => col.notNull())
		.addColumn("author", "text", (col) => col.notNull())
		.addColumn("isPass", "integer", (col) =>
			col.check(sql`isPass IS NULL OR isPass IN (0, 1)`)
		)
		.addColumn("questionId", "integer", (col) =>
			col.notNull().references("questions.id")
		)
		.addColumn("categoryId", "integer", (col) =>
			col.notNull().references("category.id")
		)
		.addColumn("gameId", "integer", (col) =>
			col.notNull().references("games.id")
		)
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("answers").execute();
}
