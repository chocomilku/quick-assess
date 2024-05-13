import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface LogsTable {
	id: Generated<number>;
	timestamp: Generated<string>;
	action: string;
}

export type Logs = Selectable<LogsTable>;
export type NewLogs = Insertable<LogsTable>;
export type LogsUpdate = Updateable<LogsTable>;
