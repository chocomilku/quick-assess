import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	// add questions table
	await db.schema
		.createTable("questions")
		.addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
		.addColumn("gameId", "integer", (col) =>
			col.notNull().references("games.id")
		)
		.addColumn("categoryId", "integer", (col) =>
			col.notNull().references("category.id")
		)
		.addColumn("question", "text", (col) => col.notNull())
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	// remove questions table
	await db.schema.dropTable("questions").execute();
}
