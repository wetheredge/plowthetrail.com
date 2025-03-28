import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import type { Condition } from "#shared/condition";

export const reports = sqliteTable("reports", {
	id: integer().primaryKey(),
	lat: integer().notNull(),
	lon: integer().notNull(),
	condition: integer().notNull().$type<Condition>(),
	notes: text().notNull(),
	createdAt: integer({ mode: "timestamp" }).notNull(),
});
