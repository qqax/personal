import { drizzle } from "drizzle-orm/neon-http";
// import { drizzle } from "drizzle-orm/node-postgres";

import * as common from "@/app/lib/schema/common";
import * as concert_records from "@/app/lib/schema/concert-records";
import * as auth from "@/app/lib/schema/auth";

import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({
    client: sql,
    schema: {
        ...common,
        ...concert_records,
        ...auth,
    },
});

// export const db = drizzle({
//     connection: {
//         connectionString: process.env.POSTGRES_URL,
//     },
//
//     schema: {
//         ...common,
//         ...concert_records,
//         ...auth,
//     },
// });