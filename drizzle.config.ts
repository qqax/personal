import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
    out: './drizzle',
    schema: './app/lib/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.POSTGRES_URL!,
    },
    verbose: true,
    strict: true,
    migrations: {
        // table: 'my-migrations-table', // `__drizzle_migrations` by default
        schema: 'public', // used in PostgreSQL only, `drizzle` by default
    },
});