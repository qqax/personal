import {drizzle, NodePgQueryResultHKT} from "drizzle-orm/node-postgres";
import {count, ExtractTablesWithRelations} from "drizzle-orm";
import {artistTable, concertsTable, recordsTable, recordTypesTable, socialTable} from "@/app/db/schema";
import {PgTransaction} from "drizzle-orm/pg-core";

const db = drizzle({
    connection: {
        connectionString: process.env.POSTGRES_URL,
    },
});

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
        console.log('Social types created!');
    } else {
        console.log('Social types already exists!');
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
        console.log('Record types created!');
    } else {
        console.log('Record types already exists!');
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
            link: "https://www.youtube.com/embed/tIADv9ff2Qs?si=K7rwIDL2zPzhmslC",
            date: [new Date('2024-05-30 18:30')],
            title: "Alexander's Final Performance of the Academic Year",
            short_description: "Bach, Mozart, Beethoven, Chopin, Scriabin, R. Wagner – F. Liszt, P. Tchaikovsky – S. Rachmaninov",
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
            title_ru: "Финальный концерт академического 2024 года",
            short_description_ru: "Бах, Моцарт, Бетховен, Шопен, Скрябин, Вагнер–Лист, Чайковский–Рахманинов",
            description_ru: null,
            record_type_id: 1,
        },
        {
            link: "https://www.youtube.com/embed/25FJM6fH58Q?si=ezuCKJsiXc50KbEL",
            date: [new Date('2024-05-12 17:00')],
            title: "Piano Concert in the Roerich Museum (Bishkek)",
            short_description: "Bach, Beethoven, Chopin, Scriabin, and Mendelssohn-Rachmaninoff",
            description: "J.S. Bach - Italian Concerto BWV 971 F major\n" +
                "I. Allegro\n" +
                "II. Andante\n" +
                "III. Presto\n" +
                "\n" +
                "L. van Beethoven - Sonata No. 12 op. 26 A-flat major\n" +
                "I. Andante con variazioni\n" +
                "II. Scherzo: Allegro molto\n" +
                "III. Funeral March on the Death of a Hero: Maestoso andante\n" +
                "IV. Rondo: Allegro\n" +
                "\n" +
                "F. Chopin - Sonata No. 2 op. 35 B-flat minor\n" +
                "I. Grave – Doppio movimento\n" +
                "II. Scherzo\n" +
                "III. Funeral March: Lento\n" +
                "IV. Finale: Presto\n" +
                "\n" +
                "A. Scriabin - Sonata No. 1 op. 6 F-sharp minor\n" +
                "I. Allegro con fuoco\n" +
                "II. Adagio\n" +
                "III. Presto\n" +
                "IV. Funeral March\n" +
                "\n" +
                "F. Chopin - Berceuse op. 57 D-flat major\n" +
                "\n" +
                "F. Mendelssohn-S. Rachmaninoff - Scherzo (from the music for William Shakespeare's comedy \"A Midsummer Night's Dream\")",
            title_ru: "Концерт в музее им. Н.К. Рериха (г. Бишкек)",
            short_description_ru: "Бах, Бетховен, Шопен, Скрябин и Мендельсон-Рахманинов",
            description_ru: null,
            record_type_id: 1,
        },
        {
            link: "https://www.youtube.com/embed/Kbv0I14Wjsw?si=4qkxsx_Vxz54AufH",
            date: [new Date('2024-04-16 17:00')],
            title: "Piano Concert in the Roerich museum (Bishkek)",
            title_ru: "Концерт в музее им. Н.К. Рериха (г. Бишкек)",
            short_description: "Mozart, Chopin, Beethoven",
            short_description_ru: "Моцарт, Шопен, Бетховен",
            description: "ALEXANDER KUDRYAVTSEV -\n" +
                "Lecturer at the Kyrgyz National Conservatory\n" +
                "named after K. Moldobasanov, laureate of international competitions.\n" +
                "\n" +
                "🎼Concert Program:\n" +
                "Mozart - Sonata #11 K. 331 A-major\n" +
                "I. Andante grazioso\n" +
                "II. Menuetto\n" +
                "III. Rondo alla turca\n" +
                "\n" +
                "F. Chopin - Sonata #2 op. 35 b-flat minor\n" +
                "I. Grave – Doppio movimento\n" +
                "II. Scherzo\n" +
                "III. Marche funèbre: Lento\n" +
                "IV. Finale: Presto\n" +
                "\n" +
                "L. van Beethoven - A. Rubinstein - \"Turkish March\" from the music for the drama \"Ruins of Athens (1811)",
            description_ru: null,
            record_type_id: 1,
        },
        {
            link: "https://www.youtube.com/embed/gGeMXSF5ehY?si=hQ7Sv1XWQPXlSGP2",
            date: [new Date('2024-03-28 15:00')],
            title: "Musical Farewell: Karakol's Grand Finale Concert part - 1",
            title_ru: "Концерт студентов РАМ им. Гнесиных в г. Каракол. Часть 1",
            short_description: "Sergey Utkin, Harit Chunananthasap, Eva Shetko",
            short_description_ru: "Играют С. Уткин, Х. Чунанантасап, Е. Шетько",
            description: "Program\n" +
                "Performed by students of the Gnessin Music Academy:\n" +
                "Sergey Utkin (class of Prof. V. Nosina)\n" +
                "Harit Chunananthasap (class of Prof. V. Tropp)\n" +
                "Eva Shetko (class of Prof. O. Danilova)\n" +
                "\n" +
                "Part I:\n" +
                "\n" +
                "François Couperin – \"La Couperin\" from \"Piece de clavecin\", Book IV, order 21\n" +
                "\n" +
                "Frédéric Chopin – Scherzo No.1, Op. 20, in B minor\n" +
                "Performed by Harit Chunananthasap\n" +
                "\n" +
                "Johannes Brahms – Intermezzo, Op. 118 No.2, in A major\n" +
                "Performed by Sergey Utkin\n" +
                "\n" +
                "Sergei Prokofiev – Sonata No.5 (1923), Op. 38, in C major. I movement – Allegro tranquillo.\n" +
                "Alexander Scriabin – Etude Op. 8 No.3, in B minor\n" +
                "Performed by Eva Shetko\n" +
                "\n" +
                "Pyotr Tchaikovsky — Mikhail Pletnev – Concert Suite from the ballet \"The Sleeping Beauty\"\n" +
                "I. Prologue\n" +
                "II. Dance of the Pages\n" +
                "III. Vision\n" +
                "V. Chirping Canary\n" +
                "IX. Little Red Riding Hood and the Wolf\n" +
                "X. Adagio\n" +
                "Performed by Harit Chunananthasap",
            description_ru: null,
            record_type_id: 1,
        },
        {
            link: "",
            date: [new Date('2024-03-28 16:00')],
            title: "Musical Farewell: Karakol's Grand Finale Concert part - 2",
            title_ru: "Концерт студентов РАМ им. Гнесиных в г. Каракол. Часть 2",
            short_description: "Sergey Utkin, Harit Chunananthasap, Eva Shetko",
            short_description_ru: "Играют С. Уткин, Х. Чунанантасап, Е. Шетько",
            description: "Location: Tumanov Music School, Karakol\n" +
                "\n" +
                "Date: March 28, 2024\n" +
                "\n" +
                "Program\n" +
                "\n" +
                "Performed by students of the Gnessin RAM:\n" +
                "Sergey Utkin (class of Prof. V.  Nosina)\n" +
                "Harit Chunananthasap (class of Prof. V. Tropp)\n" +
                "Eva Shetko (class of Prof. O. Danilova)\n" +
                "\n" +
                "Part II:\n" +
                "\n" +
                "Johannes Brahms – Concerto No.1, Op. 15, in D minor\n" +
                "I. Maestoso\n" +
                "II. Adagio\n" +
                "III. Rondo. Allegro non troppo\n" +
                "Performed by Sergey Utkin, orchestra part by Alexander Kudryavtsev\n" +
                "Concert Host: Sergey Utkin",
            description_ru: null,
            record_type_id: 1,
        },
        {
            link: "",
            date: [new Date('2022-02-01 19:00')],
            title: "Piano concert by students of the Gnessin Academy of Music in the Roerich Museum",
            title_ru: "Концерт студентов РАМ им. Гнесиных в музее им. Н.К. Рериха (г. Бишкек)",
            short_description: "",
            short_description_ru: "",
            description: "",
            description_ru: null,
            record_type_id: 1,
        },
        {
            link: "",
            date: [new Date('2022-02-01 19:00')],
            title: "",
            title_ru: "",
            short_description: "",
            short_description_ru: "",
            description: "",
            description_ru: null,
            record_type_id: 1,
        },
        {
            link: "",
            date: [new Date('2022-02-01 19:00')],
            title: "",
            title_ru: "",
            short_description: "",
            short_description_ru: "",
            description: "",
            description_ru: null,
            record_type_id: 1,
        },
        {
            link: "",
            date: [new Date('2022-02-01 19:00')],
            title: "",
            title_ru: "",
            short_description: "",
            short_description_ru: "",
            description: "",
            description_ru: null,
            record_type_id: 1,
        },
        {
            link: "",
            date: [new Date('2022-02-01 19:00')],
            title: "",
            title_ru: "",
            short_description: "",
            short_description_ru: "",
            description: "",
            description_ru: null,
            record_type_id: 1,
        },
        {
            link: "",
            date: [new Date('2022-02-01 19:00')],
            title: "",
            title_ru: "",
            short_description: "",
            short_description_ru: "",
            description: "",
            description_ru: null,
            record_type_id: 1,
        },
    ];

    await tx.insert(recordsTable).values(records);

    console.log('New records created!');
}

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

export async function GET() {
    await db.transaction(async (tx) => {
        try {
            await seedArtist(tx);
            await seedSocial(tx);
            await seedRecordTypes(tx);
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
