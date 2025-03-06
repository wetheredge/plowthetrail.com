export default eventHandler(async (event) => {
	const { id } = getRouterParams(event);

	const deletedReport = await useDrizzle()
		.delete(tables.reports)
		.where(eq(tables.reports.id, Number(id)))
		.returning()
		.get();

	if (!deletedReport) {
		throw createError({
			statusCode: 404,
			message: "Report not found",
		});
	}
});
