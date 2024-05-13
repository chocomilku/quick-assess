import { AnswersTable } from "./answers.table";
import { CategoryTable } from "./category.table";
import { GamesTable } from "./games.table";
import { LogsTable } from "./logs.table";
import { QuestionsTable } from "./questions.table";

export interface AppDatabase {
	games: GamesTable;
	questions: QuestionsTable;
	category: CategoryTable;
	logs: LogsTable;
	answers: AnswersTable;
}
