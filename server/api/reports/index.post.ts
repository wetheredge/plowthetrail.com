import { z } from "zod";
import { toDb } from "./_common";

enum Condition {
	Unusable,
	Poor,
	Passable,
	Excellent,
}

const reportSchema = z.object({
	lat: z.number(),
	lon: z.number(),
	condition: z.nativeEnum(Condition),
	notes: z.string(),
});

export default eventHandler(async (event) => {
	const result = await readValidatedBody(event, (body) =>
		reportSchema.safeParse(body)
	);

	if (!result.success) {
		throw createError({
			statusCode: 400,
			message: "Invalid report",
			data: result.error.issues,
		});
	}

	const report = toDb({
		lat: result.data.lat,
		lon: result.data.lon,
		condition: result.data.condition,
		notes: result.data.notes,
		createdAt: new Date(),
	});
	return await useDrizzle()
		.insert(tables.reports)
		.values(report)
		.returning()
		.get();
});
