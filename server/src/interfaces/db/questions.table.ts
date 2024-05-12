import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface QuestionsTable {
	id: Generated<Number>;
	gameId: Number;
	categoryId: Number;
	question: string;
}

export type Questions = Selectable<QuestionsTable>;
export type NewQuestions = Insertable<QuestionsTable>;
export type QuestionsUpdate = Updateable<QuestionsTable>;
