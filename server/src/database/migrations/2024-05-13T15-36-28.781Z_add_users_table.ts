import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("users")
		.addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
		.addColumn("username", "text", (col) => col.unique().notNull())
		.addColumn("password", "text", (col) => col.notNull())
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("users").execute();
}
