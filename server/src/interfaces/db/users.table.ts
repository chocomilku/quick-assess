import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface UsersTable {
	id: Generated<Number>;
	username: string;
	password: string;
}

export type Users = Selectable<UsersTable>;
export type NewUsers = Insertable<UsersTable>;
export type UsersUpdate = Updateable<UsersTable>;
