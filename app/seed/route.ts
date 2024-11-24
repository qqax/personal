import {drizzle, NodePgQueryResultHKT} from "drizzle-orm/node-postgres";
import {count, ExtractTablesWithRelations, sql} from "drizzle-orm";
import {artistTable, recordTypesTable, socialTable} from "@/app/db/schema";
import {PgTransaction} from "drizzle-orm/pg-core";

const db = drizzle({
    connection: {
        connectionString: process.env.POSTGRES_URL,
    }
});

async function addConstraintToArtistTable(tx: PgTransaction<NodePgQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>) {
    const revoke = sql.raw("REVOKE DELETE, TRUNCATE ON public.artist FROM public;");
    tx.execute(revoke);

    console.log("added revoke constraint to artist table")
}

async function seedSocial(tx: PgTransaction<NodePgQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>) {
    const socialTableRowNum = await tx.select({count: count()}).from(socialTable);

    if (socialTableRowNum[0].count !== 5) {
        const social: typeof socialTable.$inferInsert[] = [
            {service: 'mail'},
            {service: 'phone'},
            {service: 'facebook'},
            {service: 'youtube'},
            {service: 'instagram'},
        ];

        await tx.insert(socialTable).values(social);
        console.log('Social types created!')
    } else {
        console.log('Social types already exists!')
    }
}

async function seedRecordTypes(tx: PgTransaction<NodePgQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>) {
    const recordTypesRowNum = await tx.select({count: count()}).from(recordTypesTable);

    if (recordTypesRowNum[0].count !== 3) {
        const recordTypes: typeof recordTypesTable.$inferInsert[] = [
            {record_type: 'live'},
            {record_type: 'cd'},
            {record_type: 'self_made'},
        ];

        await tx.insert(recordTypesTable).values(recordTypes);
        console.log('Record types created!')
    } else {
        console.log('Record types already exists!')
    }
}

async function seedArtist(tx: PgTransaction<NodePgQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>) {
    const artistRowNum = await tx.select({count: count()}).from(artistTable);

    if (artistRowNum[0].count === 0) {
        const artist: typeof artistTable.$inferInsert = {
            name: 'Alexander',
            last_name: 'Kudryavtsev',
            profession: 'pianist',
            biography: ['Alexander was born on July 31, 1987 in Moscow, Russia.',

                'He studied in Prof. T. Zelikman\'s piano class at the Gnessin School and afterwards at the Gnessin ' +
                'Academy. Later he taught at the Gnessin Academy (2016 — 2022). Now he works as a teacher at the ' +
                'Kyrgyz National Conservatory named K. Maldybasanov.',

                'Alexander toured Italy, Germany, the Netherlands, the Czech Republic, France, and Russia as a pianist. ' +
                'Repeatedly performed solo and played with the orchestra in various halls of Moscow, including the Great ' +
                'Hall of the Moscow Conservatory. Have records on the radio and CDs.',

                'Alexander is the winner of many competitions. Among them is the 1st prize in the radio competition ' +
                '"Concertino Prague" (2003), the 1st prize and the medal of the President of Italy of the 4th ' +
                'international competition of the association "Dino Ciani" (Verbania, Italy, 2005), the winner of ' +
                'the 1st prize of the 1st Stanislav Neuhaus International Piano Competition (2007).']
        };

        await tx.insert(artistTable).values(artist);

        console.log('New artist created!')
    } else {
        console.log('Artist already exists!')
    }
}

export async function GET() {
    await db.transaction(async (tx) => {
        try {
            await addConstraintToArtistTable(tx);
            await seedArtist(tx);
            await seedSocial(tx);
            await seedRecordTypes(tx);
        } catch (err) {
            console.error(err);
            tx.rollback();
            return Response.json({err}, {status: 500});
        }
    })

    return Response.json({message: 'Database seeded successfully'});
}
