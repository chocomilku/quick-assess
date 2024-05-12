import { z } from "zod";

const booleanToNumber = (b: boolean) => {
	return z
		.boolean()
		.transform((val) => (val ? 1 : 0))
		.parse(b);
};

export { booleanToNumber };
