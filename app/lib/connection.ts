import { drizzle } from "drizzle-orm/node-postgres";
import * as common from "@/app/lib/schema/common";
import * as concert_records from "@/app/lib/schema/concert-records";
import * as auth from "@/app/lib/schema/auth";

export const db = drizzle({
    connection: {
        connectionString: process.env.POSTGRES_URL,
    },

    schema: {
        ...common,
        ...concert_records,
        ...auth,
    },
});