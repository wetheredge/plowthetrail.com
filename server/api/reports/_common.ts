const gpsScale = Math.pow(10, 5);

type ReportSelect = typeof tables.reports.$inferSelect;
export function fromDb(report: ReportSelect): ReportSelect {
	report.lat /= gpsScale;
	report.lon /= gpsScale;
	return report;
}

type ReportInsert = typeof tables.reports.$inferInsert;
export function toDb(report: ReportInsert): ReportInsert {
	report.lat = Math.round(report.lat * gpsScale);
	report.lon = Math.round(report.lon * gpsScale);
	return report;
}
