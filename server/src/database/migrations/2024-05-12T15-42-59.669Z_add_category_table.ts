import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	// add category table
	await db.schema
		.createTable("category")
		.addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
		.addColumn("gameId", "integer", (col) =>
			col.notNull().references("games.id")
		)
		.addColumn("text", "text", (col) => col.notNull())
		.addColumn("points", "integer", (col) => col.notNull())
		.addColumn("color", "text", (col) => col.notNull())
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	// remove category table
	await db.schema.dropTable("category").execute();
}
