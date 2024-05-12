import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface CategoryTable {
	id: Generated<number>;
	gameId: number;
	text: string;
	points: number;
	color: string;
}

export type Category = Selectable<CategoryTable>;
export type NewCategory = Insertable<CategoryTable>;
export type CategoryUpdate = Updateable<CategoryTable>;
