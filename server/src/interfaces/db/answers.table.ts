import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface AnswersTable {
	id: Generated<number>;
	timestamp: Generated<string>;
	answer: string;
	author: string;
	isPass: Generated<number | null>;
	questionId: number;
	categoryId: number;
	gameId: number;
}

export type Answers = Selectable<AnswersTable>;
export type NewAnswers = Insertable<AnswersTable>;
export type AnswersUpdate = Updateable<AnswersTable>;
