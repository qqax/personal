import {count, sql} from "drizzle-orm";
import {artistTable, recordTypesTable, socialTable} from "@/app/db/schema";
import {drizzle} from "drizzle-orm/node-postgres";

async function main() {
    const db = drizzle({
        connection: {
            connectionString: process.env.POSTGRES_URL,
            ssl: true
        }
    });

    const revoke = sql.raw("REVOKE DELETE, TRUNCATE ON public.artist FROM public;");
    console.log(revoke);

    const artistRowNum = await db.select({ count: count() }).from(artistTable);

    console.log(artistRowNum);

    const artist: typeof artistTable.$inferInsert = {
        name: 'Alexander',
        last_name: 'Kudryavtsev',
        biography: 'Alexander was born on July 31, 1987 in Moscow, Russia.\n\nHe studied in Prof. T. Zelikman\'s piano ' +
            'class at the Gnessin School and afterwards at the Gnessin Academy. Later he taught at the Gnessin Academy ' +
            '(2016 — 2022). Now he works as a teacher at the Kyrgyz National Conservatory named K. Maldybasanov.\n\n' +
            'Alexander toured Italy, Germany, the Netherlands, the Czech Republic, France, and Russia as a pianist. ' +
            'Repeatedly performed solo and played with the orchestra in various halls of Moscow, including the Great ' +
            'Hall of the Moscow Conservatory. Have records on the radio and CDs.\n\nAlexander is the winner of many ' +
            'competitions. Among them is the 1st prize in the radio competition "Concertino Prague" (2003), the 1st ' +
            'prize and the medal of the President of Italy of the 4th international competition of the association ' +
            '"Dino Ciani" (Verbania, Italy, 2005), the winner of the 1st prize of the 1st Stanislav Neuhaus ' +
            'International Piano Competition (2007).'
    };

    await db.insert(artistTable).values(artist);
    console.log('New artist created!')

    const social: typeof socialTable.$inferInsert[] = [
        {service: 'mail'},
        {service: 'phone'},
        {service: 'facebook'},
        {service: 'youtube'},
        {service: 'instagram'},
    ];

    await db.insert(socialTable).values(social);
    console.log('Social types created!')


    const recordTypes: typeof recordTypesTable.$inferInsert[] = [
        {record_type: 'live'},
        {record_type: 'cd'},
        {record_type: 'self_made'},
    ];

    await db.insert(recordTypesTable).values(recordTypes);
    console.log('Record types created!')

    // const users = await db.select().from(usersTable);
    // console.log('Getting all users from the database: ', users)
    /*
    const users: {
      id: number;
      name: string;
      age: number;
      email: string;
    }[]
    */
    // await db
    //     .update(usersTable)
    //     .set({
    //         age: 31,
    //     })
    //     .where(eq(usersTable.email, user.email));
    // console.log('User info updated!')
    // await db.delete(usersTable).where(eq(usersTable.email, user.email));
    // console.log('User deleted!')
}
main();