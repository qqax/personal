"use server"

import {drizzle} from "drizzle-orm/node-postgres";
import * as schema from "./schema"
import {artistTable, concertsTable, newsTable, recordsTable} from "./schema"
import {cacheTag} from "next/dist/server/use-cache/cache-tag";
import facebookIcon from "../../public/icons/facebook.svg";
import youtubeIcon from "../../public/icons/youtube.svg";
import {ArtistData, Biography, Concerts, Name, Profession} from "@/app/db/definitions";
import {eq, SQL, sql} from "drizzle-orm";
import {PgColumn} from "drizzle-orm/pg-core";
import Aliased = SQL.Aliased;

const db = drizzle({
    connection: {
        connectionString: process.env.POSTGRES_URL,
    },

    schema
});

const NOT_DEFAULT_LOCALES = ["ru"];

const selectTranslatedString = (column: PgColumn, locale: string): Aliased<string> => {
    const localeColumn = column.name + "_" + locale;
    return sql.raw(`coalesce("${localeColumn}", "${column.name}")`).as(column.name) as Aliased<string>;
}

const artistTableQuery = async (column: PgColumn, locale: string): Promise<ArtistData> => {
    try {
        if (NOT_DEFAULT_LOCALES.includes(locale)) {
            const data =
                await db.query.artistTable.findFirst({
                    columns: {[column.name]: true},
                    extras: {
                        [column.name]: selectTranslatedString(column, locale),
                    }
                });

            return data?.[column.name] as ArtistData;
        }

        const data =
            await db.query.artistTable.findFirst({
            columns: {[column.name]: true},
            extras: {
                [column.name]: sql`${column}`.as(column.name),
            }
        });

        return data?.[column.name] as ArtistData || "";
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


export async function fetchConcerts(locale: string): Promise<Concerts> {
    return db.select({
        date: concertsTable.date,
        place: concertsTable.place,
        address: concertsTable.address,
        short_description: concertsTable.short_description,
        description: sql<string>`coalesce(${`"description"`}, ${`"description_"` + locale})`.as(`description`),
        poster: concertsTable.poster,
        link: concertsTable.link,
        record: recordsTable.link,
    }).from(concertsTable)
        .orderBy(concertsTable.date)
        .fullJoin(recordsTable, eq(recordsTable.id, concertsTable.record_id));
}

export async function insertEmail(email: string): Promise<boolean> {
    try {
        await db.insert(newsTable).values({ email }).onConflictDoNothing();
        console.log(email)
        return true;
    } catch (error) {
        console.error('Database Error:', error);
        return false;
    }
}