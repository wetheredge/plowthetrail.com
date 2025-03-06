import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const reports = sqliteTable("reports", {
	id: integer().primaryKey(),
	lat: integer().notNull(),
	lon: integer().notNull(),
	condition: integer().notNull(),
	notes: text().notNull(),
	createdAt: integer({ mode: "timestamp" }).notNull(),
});
