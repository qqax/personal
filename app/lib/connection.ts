import {drizzle} from "drizzle-orm/node-postgres";
import * as schema from "@/app/lib/schema";

export const db = drizzle({
    connection: {
        connectionString: process.env.POSTGRES_URL,
    },

    schema,
});