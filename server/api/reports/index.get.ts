export default eventHandler(async () => {
	return useDrizzle().select().from(tables.reports).all();
});
