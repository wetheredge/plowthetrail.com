import * as v from "valibot";
import { Condition } from "#shared/condition";
import { toDb } from "./_common";

const reportSchema = v.object({
	lat: v.number(),
	lon: v.number(),
	condition: v.enum(Condition),
	notes: v.string(),
});

export default eventHandler(async (event) => {
	const result = await readValidatedBody(event, (body) =>
		v.safeParse(reportSchema, body),
	);

	if (!result.success) {
		throw createError({
			statusCode: 400,
			message: "Invalid report",
			data: result.issues,
		});
	}

	const report = toDb({
		lat: result.output.lat,
		lon: result.output.lon,
		condition: result.output.condition,
		notes: result.output.notes,
		createdAt: new Date(),
	});
	return await useDrizzle()
		.insert(tables.reports)
		.values(report)
		.returning()
		.get();
});
