import {drizzle, NodePgQueryResultHKT} from "drizzle-orm/node-postgres";
import {count, ExtractTablesWithRelations} from "drizzle-orm";
import {
    artistTable,
    concertsTable,
    contactsTable,
    concertRecordsTable,
    socialsTable,
} from "@/app/lib/schema";
import {PgTransaction} from "drizzle-orm/pg-core";
import {
    CONTACT_TYPE_EMAIL,
    CONTACT_TYPE_PHONE,
    RECORD_SERVICES_YOUTUBE,
    SOCIAL_TYPE_FACEBOOK,
    SOCIAL_TYPE_YOUTUBE
} from "@/app/lib/enums";

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

async function seedSocials(tx: PgTransaction<NodePgQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>) {
    const socials: typeof socialsTable.$inferInsert[] = [
        {social_type: SOCIAL_TYPE_FACEBOOK, link: 'https://www.facebook.com/alexander.kudryavtseff'},
        {social_type: SOCIAL_TYPE_YOUTUBE, link: 'https://youtube.com/@alexanderkudryavtsev-d7y?si=y8I-WnrEN3MqVHxk'},
    ];

    await tx.insert(socialsTable).values(socials);
    console.log('Socials created!');
}

async function seedContacts(tx: PgTransaction<NodePgQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>) {
    const contacts: typeof contactsTable.$inferInsert[] = [
        {contact_type: CONTACT_TYPE_EMAIL, contact: 'alexanderkudryavtsev87@gmail.com'},
        {contact_type: CONTACT_TYPE_PHONE, contact: '+996 (700) 38-63-64'},
    ];

    await tx.insert(contactsTable).values(contacts);
    console.log('Contacts created!');
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
            date: new Date('2025-02-01 19:00'),
        },
    ];

    await tx.insert(concertsTable).values(concerts);

    console.log('New concerts created!');
}

async function seedRecords(tx: PgTransaction<NodePgQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>) {
    const records: typeof concertRecordsTable.$inferInsert[] = [
        {
            uuid: "tIADv9ff2Qs",
            record_service: RECORD_SERVICES_YOUTUBE,
            concert_id: 1,
        },
        {
            uuid: "25FJM6fH58Q",
            record_service: RECORD_SERVICES_YOUTUBE,
            concert_id: 1,
        },
        {
            uuid: "Kbv0I14Wjsw",
            record_service: RECORD_SERVICES_YOUTUBE,
            concert_id: 1,
        },
        {
            uuid: "gGeMXSF5ehY",
            record_service: RECORD_SERVICES_YOUTUBE,
            concert_id: 1,
        },
    ];

    await tx.insert(concertRecordsTable).values(records);

    console.log('New records created!');
}

export async function GET() {
    await db.transaction(async (tx) => {
        try {
            await seedArtist(tx);
            await seedSocials(tx);
            await seedContacts(tx);
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
