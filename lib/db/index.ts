import "@/lib/config";
import * as schema from "@/lib/db/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
//
const connectionString = process.env.DATABASE_URL as string;
//  Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false });
const db = drizzle(client, { schema });
//
export default db;
