"use server";

import {artistTable, concertsTable, newsTable, recordsTable, recordTypesTable} from "./schema";
import {cacheTag} from "next/dist/server/use-cache/cache-tag";
import {
    ArtistData,
    Biography,
    ConcertDescription,
    Concerts,
    ConcertsData,
    Name,
    Profession,
    Records,
} from "@/app/lib/definitions";
import {eq, sql} from "drizzle-orm";
import {PgColumn, PgTableWithColumns} from "drizzle-orm/pg-core";
import {cacheLife} from "next/dist/server/use-cache/cache-life";
import {db} from "@/app/lib/connection";
import {NotDefaultLocales} from "@/i18n/routing";

/* eslint-disable  @typescript-eslint/no-explicit-any */
const selectTranslated = (table: PgTableWithColumns<any>, column: string, locale: string) => {
    if (NotDefaultLocales.includes(locale)) {
        return sql<string>`coalesce
            (${table[`${column}_${locale}`]}, ${table[column]})`.as(column);
    }
    return sql<string>`${table[column]}`.as(column);
};

const artistTableQuery = async (column: PgColumn, locale: string): Promise<ArtistData> => {
    try {
        const data =
            await db.query.artistTable.findFirst({
                columns: {[column.name]: true},
                extras: {
                    [column.name]: selectTranslated(artistTable, column.name, locale),
                },
            });

        return data?.[column.name] as ArtistData;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch the ${column}.`);
    }
};

export async function fetchArtistName(locale: string): Promise<Name> {
    'use cache';

    const column = 'name';
    cacheTag(column);

    return await artistTableQuery(artistTable[column], locale) as Name;
}

export async function fetchArtistProfession(locale: string): Promise<Profession> {
    'use cache';

    const column = 'profession';
    cacheTag(column);

    return await artistTableQuery(artistTable[column], locale) as Profession;
}

export async function fetchBiography(locale: string): Promise<Biography> {
    'use cache';

    const column = 'biography';
    cacheTag(column);

    return await artistTableQuery(artistTable[column], locale) as Biography;
}

export async function fetchSocial() {
    'use cache';
    cacheTag('social');

    try {
        return [
            {type: "facebook", url: "https://www.facebook.com/"},
            {type: "youtube", url: "https://youtube.com/@alexanderkudryavtsev-d7y?si=y8I-WnrEN3MqVHxk"},
        ];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the artist biography.');
    }
}

export async function fetchContacts() {
    'use cache';
    cacheTag('contacts');

    try {
        return {
            mail: ["alar0@yahoo.com", "alexanderkudryavtsev87@gmail.com"],
            phone: ["+996 (700) 38-63-64", "+7 (906) 064-60-65"],
        };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the artist biography.');
    }
}

export async function fetchConcerts(locale: string): Promise<ConcertsData> {
    'use cache';
    cacheTag('concert');
    cacheLife('days');

    const concerts: Concerts = await db.select({
        id: sql<string>`to_char
            (${concertsTable.date}, 'DD_Mon_YY_HH24_MI')`.as('id'),
        date: concertsTable.date,
        place: selectTranslated(concertsTable, "place", locale),
        short_description: selectTranslated(concertsTable, "short_description", locale),
    }).from(concertsTable)
        .orderBy(concertsTable.date);

    const firstUpcomingConcertIndex = concerts?.findIndex(({date}) => {
        return date && date.getTime() > Date.now();
    });

    return {
        concerts,
        firstUpcomingConcertIndex,
    } as ConcertsData;
}

export async function fetchConcertDescription(id: string, locale: string): Promise<ConcertDescription> {
    'use cache';
    cacheTag('concert');

    try {
        return await db.query.concertsTable.findFirst({
            columns: {
                date: true,
                link: true,
                poster: true,
            },
            with: {
                recordsTable: {
                    columns: {
                        uuid: true,
                    },
                    extras: {
                        title: selectTranslated(recordsTable, "title", locale),
                    },
                },
            },
            extras: {
                place: selectTranslated(concertsTable, "place", locale),
                address: selectTranslated(concertsTable, "address", locale),
                description: selectTranslated(concertsTable, "description", locale),
            },
            where: (concertsTable, {eq}) => eq(concertsTable.date, sql.raw(`to_timestamp('${id}', 'DD_Mon_YY_HH24_MI')::timestamp`)),
        });
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch the concert's description.`);
    }
}

export async function fetchRecords(): Promise<Records> {
    'use cache';
    cacheTag('record');

    return db.select({
        date: recordsTable.date,
        uuid: recordsTable.uuid,
        record_type: recordTypesTable.record_type,
    }).from(recordsTable)
        .leftJoin(recordTypesTable, eq(recordTypesTable.id, recordsTable.record_type_id))
        .orderBy(recordsTable.date);
}

export async function insertEmail(email: string): Promise<boolean> {
    try {
        await db.insert(newsTable).values({email}).onConflictDoNothing();
        console.log(email);
        return true;
    } catch (error) {
        console.error('Database Error:', error);
        return false;
    }
}