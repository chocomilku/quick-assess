import { CategoryTable } from "./category.table";
import { GamesTable } from "./games.table";
import { QuestionsTable } from "./questions.table";

export interface AppDatabase {
	games: GamesTable;
	questions: QuestionsTable;
	category: CategoryTable;
}
