import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface GamesTable {
	id: Generated<number>;
	/**
	 * 0: Not running
	 * 1: Running
	 */
	isRunning: 0 | 1;
	name: string;
}

export type Games = Selectable<GamesTable>;
export type NewGames = Insertable<GamesTable>;
export type GamesUpdate = Updateable<GamesTable>;
