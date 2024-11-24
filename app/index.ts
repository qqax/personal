import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const db = drizzle({
    connection: {
        connectionString: process.env.POSTGRES_URL,
    }
});

await migrate(db, {migrationsFolder: "db/migrations"});
