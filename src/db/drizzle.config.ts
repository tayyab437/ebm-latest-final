import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

const sqlHost = process.env.SQL_HOST;
const sqlDbName = process.env.SQL_DB_NAME;
const user = process.env.SQL_ADMIN_USER;
const password = process.env.SQL_ADMIN_PASSWORD;

if (!sqlHost) {
  throw new Error("SQL_HOST must be set in environment variables.");
}
if (!sqlDbName) {
  throw new Error("SQL_DB_NAME must be set in environment variables.");
}
if (!user) {
  throw new Error("SQL_ADMIN_USER must be set in environment variables.");
}
if (!password) {
  throw new Error("SQL_ADMIN_PASSWORD must be set in environment variables.");
}

if (!process.env.DATABASE_URL) {
  console.log("DATABASE_URL is not set, trying to build URL with socket...");
}
const dbUrl = process.env.DATABASE_URL || `mysql://${user}:${password}@localhost/${sqlDbName}?socket=${encodeURIComponent(sqlHost)}`;

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    url: dbUrl,
  },
  verbose: true,
});
