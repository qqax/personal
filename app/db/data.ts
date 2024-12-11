"use server"

import {drizzle} from "drizzle-orm/node-postgres";
import * as schema from "./schema"
import {artistTable, concertsTable, newsTable, recordsTable} from "./schema"
import {cacheTag} from "next/dist/server/use-cache/cache-tag";
import facebookIcon from "../../public/icons/facebook.svg";
import youtubeIcon from "../../public/icons/youtube.svg";
import {
    ArtistData,
    Biography,
    ConcertDescription, ConcertIDs,
    Concerts,
    ConcertsData,
    Name,
    Profession
} from "@/app/db/definitions";
import {sql} from "drizzle-orm";
import {PgColumn, PgTableWithColumns} from "drizzle-orm/pg-core";
import {cacheLife} from "next/dist/server/use-cache/cache-life";

const db = drizzle({
    connection: {
        connectionString: process.env.POSTGRES_URL,
    },

    schema
});

const NOT_DEFAULT_LOCALES = ["ru"];

const selectTranslated = (table: PgTableWithColumns<any>, column: string, locale: string) => {
    if (NOT_DEFAULT_LOCALES.includes(locale)) {
        return sql<string>`coalesce
            (${table[`${column}_${locale}`]}, ${table[column]})`.as(column)
    }
    return sql<string>`${table[column]}`.as(column)
}

const artistTableQuery = async (column: PgColumn, locale: string): Promise<ArtistData> => {
    try {
        const data =
            await db.query.artistTable.findFirst({
                columns: {[column.name]: true},
                extras: {
                    [column.name]: selectTranslated(artistTable, column.name, locale),
                }
            });

        return data?.[column.name] as ArtistData;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch the ${column}.`);
    }
};

export async function fetchArtistName(locale: string): Promise<Name> {
    'use cache'

    const column = 'name';
    cacheTag(column);

    return await artistTableQuery(artistTable[column], locale) as Name;
}

export async function fetchArtistProfession(locale: string): Promise<Profession> {
    'use cache'

    const column = 'profession';
    cacheTag(column);

    return await artistTableQuery(artistTable[column], locale) as Profession;
}

export async function fetchBiography(locale: string): Promise<Biography> {
    'use cache'

    const column = 'biography';
    cacheTag(column);

    return await artistTableQuery(artistTable[column], locale) as Biography;
}

export async function fetchSocial() {
    'use cache'
    cacheTag('social');

    try {
        return [
            {href: "#", src: facebookIcon, alt: "Follow Alexander Kudryavtsev on Facebook"},
            {href: "#", src: youtubeIcon, alt: "Follow Alexander Kudryavtsev on Youtube"},
        ];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the artist biography.');
    }
}

export async function fetchConcerts(locale: string): Promise<ConcertsData> {
    'use cache'
    cacheTag('concert');
    cacheLife('days');

    const concerts: Concerts = await db.select({
        id: sql<string>`to_char
            (${concertsTable.date}, 'DD_Mon_YY_HH24_MI')`.as('id'),
        date: concertsTable.date,
        place: selectTranslated(concertsTable, "place", locale),
        // address: selectTranslated(concertsTable, "address", locale),
        short_description: selectTranslated(concertsTable, "short_description", locale),
        // description: selectTranslated(concertsTable, "description", locale),
        // poster: concertsTable.poster,
        // link: concertsTable.link,
        // record: recordsTable.link,
    }).from(concertsTable)
        .orderBy(concertsTable.date);
    // .fullJoin(recordsTable, eq(recordsTable.id, concertsTable.record_id));

    const firstUpcomingConcertIndex = concerts?.findIndex(({date}) => {
        return date && date.getTime() > Date.now();
    });

    return {
        concerts,
        firstUpcomingConcertIndex
    } as ConcertsData;
}

export async function fetchConcertIDs(): Promise<ConcertIDs> {
    'use cache'
    cacheTag('concert_id');

    return db.select({
        id: sql<string>`to_char
            (${concertsTable.date}, 'DD_Mon_YY_HH24_MI')`.as('id'),
    }).from(concertsTable)
        .orderBy(concertsTable.date);
}

export async function fetchConcertDescription(id: string, locale: string): Promise<ConcertDescription> {
    'use cache'
    cacheTag('concert_description');

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
                        link: true,
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

export async function insertEmail(email: string): Promise<boolean> {
    try {
        await db.insert(newsTable).values({email}).onConflictDoNothing();
        console.log(email)
        return true;
    } catch (error) {
        console.error('Database Error:', error);
        return false;
    }
}