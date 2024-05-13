import { Signale } from "signale";

export const actionLogger = new Signale({
	scope: "action",
	types: {
		action: {
			badge: "⚙️",
			color: "blue",
			label: "action",
			logLevel: "info",
		},
	},
});
