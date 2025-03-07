import { fromDb } from "./_common";

export default eventHandler(async () => {
	const reports = await useDrizzle().select().from(tables.reports).all();
	return reports.map(fromDb);
});
