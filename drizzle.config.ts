import "@/lib/config";
import type { Config } from "drizzle-kit";

export default {
  dialect: "postgresql",
  schema: "./lib/db/schema.ts",
  out: "./migrations",
  dbCredentials: {
    host: process.env.PGHOST!,
    database: process.env.PGDATABASE!,
    user: process.env.PGUSER!,
    password: process.env.PGPASSWORD!,
  },
  verbose: true,
} satisfies Config;
