import {drizzle, NodePgQueryResultHKT} from "drizzle-orm/node-postgres";
import {count, ExtractTablesWithRelations} from "drizzle-orm";
import {
    artistTable,
    contactsTable,
    socialsTable,
} from "@/app/lib/schema/common";
import {PgTransaction} from "drizzle-orm/pg-core";
import {
    CONTACT_TYPE_EMAIL,
    CONTACT_TYPE_PHONE, NOT_RELATED_RECORD_TYPE_STUDIO,
    RECORD_SERVICES_YOUTUBE,
    SOCIAL_TYPE_FACEBOOK,
    SOCIAL_TYPE_YOUTUBE
} from "@/app/lib/schema/enums";
import {concertRecordsTable, concertsTable, recordsTable} from "@/app/lib/schema/concert-records";

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
            place_ru: "Бишкек, Музей им. Рериха",
            address: 'Bishkek, Junusalieva 41',
            address_ru: "Бишкек, ул. Юнусалиева, 41",
            short_description: 'Mozart, Chopin, Beethoven',
            short_description_ru: "Моцарт, Шопен, Бетховен",
            description: 'Mozart - Sonata #11 K. 331 A-major\n' +
                'I. Andante grazioso\n' +
                'II. Menuetto\n' +
                'III. Rondo alla turca\n' +
                '\n' +
                'F. Chopin - Sonata #2 op. 35 b-flat minor\n' +
                'I. Grave – Doppio movimento\n' +
                'II. Scherzo\n' +
                'III. Marche funèbre: Lento\n' +
                'IV. Finale: Presto\n' +
                '\n' +
                'L. van Beethoven - A. Rubinstein - "Turkish March" from the music for the drama "Ruins of Athens (1811)',
            description_ru: null,
            poster: null,
            link: null,
            date: new Date('2024-04-16 17:00 GMT'),
        },
        {
            place: "Bishkek Conservatory",
            place_ru: "Консерватория им. К. Молдобасанова",
            address: '115 Jantoshev St., Bishkek',
            address_ru: "Бишкек, ул. Джантошева, 115",
            short_description: 'Bach, Mozart, Beethoven, Chopin, Scriabin, Wagner-Liszt',
            short_description_ru: "Бах, Моцарт, Бетховен, Шопен, Скрябин, Вагнер-Лист",
            description: "*Part I*\n" +
                "J.S. Bach— Italian Concerto BWV 971, F Major\n" +
                "01:12  1. Allegro\n" +
                "05:34  2. Andante\n" +
                "11:28  3. Presto\n" +
                "\n" +
                "Mozart — Sonata No. 11 K. 331, A Major\n" +
                "16:22  1. Andante grazioso\n" +
                "23:33  2. Menuetto\n" +
                "28:38  3. Rondo alla turca\n" +
                "\n" +
                "L. van Beethoven — Sonata No. 12 Op. 26, A-flat Major\n" +
                "32:52  1. Andante con variazioni\n" +
                "41:55  2. Scherzo: Allegro molto\n" +
                "44:30  3. Marcia funebre sulla morte d'un eroe: Maestoso andante\n" +
                "50:47  4. Rondo: Allegro\n" +
                "\n" +
                "*Part II*\n" +
                "F. Chopin — Sonata No. 2 Op. 35, B-flat Minor\n" +
                "54:36     1. Grave – Doppio movimento\n" +
                "1:02:00  2. Scherzo\n" +
                "1:09:25  3. Marche funèbre: Lento\n" +
                "1:17:32  4. Finale: Presto\n" +
                "\n" +
                "A. Scriabin — Sonata No. 1 Op. 6, F-sharp Minor\n" +
                "1:20:06  1. Allegro con fuoco\n" +
                "1:27:52  2. Adagio\n" +
                "1:32:31  3. Presto\n" +
                "1:36:00  4. Funèbre\n" +
                "\n" +
                "1:41:47 - R. Wagner – F. Liszt — Overture to the opera \"Tannhäuser,\" S. 442\n" +
                "\n" +
                "*Extra*\n" +
                "1:57:30 - P. Tchaikovsky – S. Rachmaninov — Lullaby\n" +
                "2:01:55 - F. Chopin — Berceuse Op. 57, D-flat Major\n" +
                "2:05:22 - F. Chopin — Etude Op. 10 №5, G-flat Major",
            description_ru: null,
            poster: null,
            link: null,
            date: new Date('2024-05-30 18:30 GMT'),
        },
    ];

    await tx.insert(concertsTable).values(concerts);

    console.log('New concerts created!');
}

async function seedRecords(tx: PgTransaction<NodePgQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>) {
    const records: typeof recordsTable.$inferInsert[] = [
        {
            uuid: "tNGOFZ5gQcg",
            date: new Date('2011-04-01 12:00 GMT'),
            short_description: "J.Haydn, Sonata in D major, Hob.XVI:24",
            short_description_ru: "J.Haydn, Sonata in D major, Hob.XVI:24",
            description: "Й. Гайдн, Соната ре мажор, Hob.XVI:24",
            description_ru: "Й. Гайдн, Соната ре мажор, Hob.XVI:24",
            record_service: RECORD_SERVICES_YOUTUBE,
            record_type: NOT_RELATED_RECORD_TYPE_STUDIO,
        },
        {
            uuid: "XjlFfwX0Q2Q",
            date: new Date('2011-04-01 14:00 GMT'),
            short_description: "S. Rachmaninoff, Variations on a Theme of Corelli, Op. 42",
            short_description_ru: "S. Rachmaninoff, Variations on a Theme of Corelli, Op. 42",
            description: "C. Рахманинов, Вариации на тему Корелли, Op. 42",
            description_ru: "C. Рахманинов, Вариации на тему Корелли, Op. 42",
            record_service: RECORD_SERVICES_YOUTUBE,
            record_type: NOT_RELATED_RECORD_TYPE_STUDIO,
        },
    ];

    await tx.insert(recordsTable).values(records);

    console.log('New records created!');
}

async function seedConcertRecords(tx: PgTransaction<NodePgQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>) {
    const records: typeof concertRecordsTable.$inferInsert[] = [
        {
            uuid: "Kbv0I14Wjsw",
            record_service: RECORD_SERVICES_YOUTUBE,
            concert_id: 1,
        },
        {
            uuid: "dOywi74R5GY",
            record_service: RECORD_SERVICES_YOUTUBE,
            concert_id: 2,
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
            await seedConcerts(tx);
            await seedConcertRecords(tx);
            await seedRecords(tx);
        } catch (err) {
            console.error(err);
            tx.rollback();
            return Response.json({err}, {status: 500});
        }
    });

    return Response.json({message: 'Database seeded successfully'});
}
