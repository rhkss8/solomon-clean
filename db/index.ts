import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let client: ReturnType<typeof postgres> | undefined;
export function getDatabaseClient() { const connectionString = process.env.POSTGRES_URL; if (!connectionString) throw new Error("POSTGRES_URL is not configured."); client ??= postgres(connectionString, { prepare: false }); return client; }
export function getDb() { return drizzle(getDatabaseClient(), { schema }); }
