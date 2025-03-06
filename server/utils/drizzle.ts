import { drizzle } from "drizzle-orm/libsql/web";
import * as schema from "../database/schema";

export { sql, eq, and, or } from "drizzle-orm";

export const tables = schema;

export function useDrizzle() {
	return drizzle({
		connection: {
			url: process.env.DATABASE_URL!,
			authToken: process.env.DATABASE_AUTH_TOKEN!,
		},
	});
}
