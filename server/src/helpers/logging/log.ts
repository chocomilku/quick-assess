import { actionLogger } from "@config/logging/action.logger";
import { db } from "@database";

export const logAction = async (action: string) => {
	try {
		actionLogger.action(action);

		await db
			.insertInto("logs")
			.values({
				action,
			})
			.executeTakeFirstOrThrow();
	} catch (err) {
		actionLogger.error("Failed to log action");
		console.error(err);
	}
};
