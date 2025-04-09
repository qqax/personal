import {drizzle, NodePgQueryResultHKT} from "drizzle-orm/node-postgres";
import {count, ExtractTablesWithRelations} from "drizzle-orm";
import {
    artistTable,
    concertsTable,
    contactsTable,
    contactTypesTable,
    recordServicesTable,
    recordsTable,
    recordTypesTable,
    socialsTable,
    socialTypesTable
} from "@/app/lib/schema";
import {PgTransaction} from "drizzle-orm/pg-core";

const db = drizzle({
    connection: {
        connectionString: process.env.POSTGRES_URL,
    },
});

async function seedArtist(tx: PgTransaction<NodePgQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>) {
    const artistRowNum = await tx.select({count: count()}).from(artistTable);

    if (artistRowNum[0].count === 0) {
        const artist: typeof artistTable.$inferInsert = {
            admin_path: "admin",
            name: 'Alexander Kudryavtsev',
            name_ru: 'Александр Кудрявцев',
            profession: 'piano',
            profession_ru: 'фортепиано',
            biography: 'Alexander was born on July 31, 1987 in Moscow, Russia.\n\n' +
                'He studied in Prof. T. Zelikman\'s piano class at the Gnessin School and afterwards at the Gnessin Academy. Later he taught at the Gnessin Academy (2016 — 2022). Now he works as a teacher at the Kyrgyz National Conservatory named K. Maldybasanov.\n\n' +
                'Alexander toured Italy, Germany, the Netherlands, the Czech Republic, France, and Russia as a pianist. Repeatedly performed solo and played with the orchestra in various halls of Moscow, including the Great Hall of the Moscow Conservatory. Have records on the radio and CDs.\n\n' +
                'Alexander is the winner of many competitions. Among them is the 1st prize in the radio competition \"Concertino Prague\" (2003), the 1st prize and the medal of the President of Italy of the 4th international competition of the association \"Dino Ciani\" (Verbania, Italy, 2005), the winner of the 1st prize of the 1st Stanislav Neuhaus International Piano Competition (2007).',
            biography_ru: 'Александр родился 31 июля 1987 года в Москве, Россия.\n\n' +
                'Он учился в классе фортепиано профессора Т. А. Зеликман в Московской Средней Специальной Школе им. Гнесиных, а затем - в Академии им. Гнесиных. После учёбы Александр преподавал в Академии специальное фортепиано с 2016 по 2022 гг. В настоящее время Александр ведёт класс специального фортепиано в Кыргизской национальной консерватории имени К. Малдыбасанова.\n\n' +
                'Александр гастролировал в Италии, Германии, Нидерландах, Чехии, Франции и России. Неоднократно выступал сольно и с оркестром в различных залах Москвы, в том числе в Большом зале Московской консерватории. Имеет записи на радио и компакт-дисках.\n\n' +
                'Александр является лауреатом многих конкурсов. Среди них — 1-я премия радиоконкурса «Концертино Прага» (2003), 1-я премия и медаль Президента Италии 4-го международного конкурса ассоциации «Дино Чиани» (Вербания, Италия, 2005), 1-я премия 1-го Международного конкурса пианистов имени Станислава Нейгауза (2007).',
        };

        await tx.insert(artistTable).values(artist);

        console.log('New artist created!');
    } else {
        console.log('Artist already exists!');
    }
}

async function seedSocialTypes(tx: PgTransaction<NodePgQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>) {
    const socialTypesTableRowNum = await tx.select({count: count()}).from(socialsTable);

    if (socialTypesTableRowNum[0].count !== 3) {
        const social: typeof socialTypesTable.$inferInsert[] = [
            {social_type: 'facebook'},
            {social_type: 'youtube'},
            {social_type: 'instagram'},
        ];

        await tx.insert(socialTypesTable).values(social);
        console.log('Social types created!');
    } else {
        console.log('Social types already exists!');
    }
}

async function seedSocials(tx: PgTransaction<NodePgQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>) {
    const socials: typeof socialsTable.$inferInsert[] = [
        {social_type_id: 1, link: 'https://www.facebook.com/alexander.kudryavtseff'},
        {social_type_id: 2, link: 'https://youtube.com/@alexanderkudryavtsev-d7y?si=y8I-WnrEN3MqVHxk'},
    ];

    await tx.insert(socialsTable).values(socials);
    console.log('Socials created!');
}


async function seedContactTypes(tx: PgTransaction<NodePgQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>) {
    const contactTypesTableRowNum = await tx.select({count: count()}).from(contactTypesTable);

    if (contactTypesTableRowNum[0].count !== 2) {
        const contactTypes: typeof contactTypesTable.$inferInsert[] = [
            {contact_type: 'mail'},
            {contact_type: 'phone'},
        ];

        await tx.insert(contactTypesTable).values(contactTypes);
        console.log('Contact types created!');
    } else {
        console.log('Contact types already exists!');
    }
}

async function seedContacts(tx: PgTransaction<NodePgQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>) {
    const contacts: typeof contactsTable.$inferInsert[] = [
        {contact_type_id: 1, contact: 'alexanderkudryavtsev87@gmail.com'},
        {contact_type_id: 2, contact: '+996 (700) 38-63-64'},
    ];

    await tx.insert(contactsTable).values(contacts);
    console.log('Contacts created!');
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
        console.log('Record types created!');
    } else {
        console.log('Record types already exists!');
    }
}

async function seedRecordServices(tx: PgTransaction<NodePgQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>) {
    const recordTypesRowNum = await tx.select({count: count()}).from(recordServicesTable);

    if (recordTypesRowNum[0].count !== 1) {
        const recordTypes: typeof recordServicesTable.$inferInsert[] = [
            {record_service: 'youtube'},
        ];

        await tx.insert(recordServicesTable).values(recordTypes);
        console.log('Record services created!');
    } else {
        console.log('Record services already exists!');
    }
}

async function seedConcerts(tx: PgTransaction<NodePgQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>) {
    const concerts: typeof concertsTable.$inferInsert[] = [
        {
            place: "Roerich museum",
            address: 'Bishkek, Junusalieva 123',
            short_description: 'Chopin evening',
            description: 'Ballades and fantasias',
            place_ru: null,
            address_ru: null,
            short_description_ru: null,
            description_ru: null,
            poster: null,
            link: null,
            record_id: null,
            date: new Date('2025-02-01 19:00'),
        },
    ];

    await tx.insert(concertsTable).values(concerts);

    console.log('New concerts created!');
}

async function seedRecords(tx: PgTransaction<NodePgQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>) {
    const records: typeof recordsTable.$inferInsert[] = [
        {
            uuid: "tIADv9ff2Qs",
            date: [new Date('2024-05-30 18:30')],
            record_service_id: 1,
            record_type_id: 1,
        },
        {
            uuid: "25FJM6fH58Q",
            date: [new Date('2024-05-12 17:00')],
            record_service_id: 1,
            record_type_id: 1,
        },
        {
            uuid: "Kbv0I14Wjsw",
            date: [new Date('2024-04-16 17:00')],
            record_service_id: 1,
            record_type_id: 1,
        },
        {
            uuid: "https://www.youtube.com/embed/gGeMXSF5ehY?si=hQ7Sv1XWQPXlSGP2",
            date: [new Date('2024-03-28 15:00')],
            record_service_id: 1,
            record_type_id: 1,
        },
    ];

    await tx.insert(recordsTable).values(records);

    console.log('New records created!');
}

export async function GET() {
    await db.transaction(async (tx) => {
        try {
            await seedArtist(tx);
            await seedSocialTypes(tx);
            await seedSocials(tx);
            await seedContactTypes(tx);
            await seedContacts(tx);
            await seedRecordTypes(tx);
            await seedRecordServices(tx);
            await seedRecords(tx);
            await seedConcerts(tx);
        } catch (err) {
            console.error(err);
            tx.rollback();
            return Response.json({err}, {status: 500});
        }
    });

    return Response.json({message: 'Database seeded successfully'});
}
