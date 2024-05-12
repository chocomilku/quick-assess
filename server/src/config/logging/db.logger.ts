import { Signale } from "signale";

export const dbLogger = new Signale({
	scope: "db",
});

export const dbMigrationLogger = new Signale({
	scope: "db migrate",
});

export const dbMigrationConfigLogger = new Signale({
	scope: "db migrate config",
});
