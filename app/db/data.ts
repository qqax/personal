"use server"

import {drizzle} from "drizzle-orm/node-postgres";
import * as schema from "./schema"
import {cacheTag} from "next/dist/server/use-cache/cache-tag";
import facebookIcon from "../../public/icons/facebook.svg";
import youtubeIcon from "../../public/icons/youtube.svg";
import {newsTable} from "./schema";

const db = drizzle({
    connection: {
        connectionString: process.env.POSTGRES_URL,
    },

    schema
});

async function cacheFetch(query: Function, column: string, locale: string): Promise<any> {
    try {
        return await selectWithLocale(query, column, locale);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch the ${column}.`);
    }
}

const NOT_DEFAULT_LOCALES = ["ru"];

function generateLocalePostfix(column: string, locale: string) {
    if (NOT_DEFAULT_LOCALES.includes(locale)) {
        return `${column}_${locale}`;
    }
    return column;
}

const selectWithLocale = async (query: Function, column: string, locale: string): Promise<any | null> => {
    const columnWithLocale = generateLocalePostfix(column, locale);

    let data = await query(columnWithLocale);
    if (!data[columnWithLocale] && NOT_DEFAULT_LOCALES.includes(locale)) {
        data = await query(column);
        return data[column];
    }

    return data[columnWithLocale];
}

const artistTableQuery = async (column: string) => await db.query.artistTable.findFirst({
    columns: {[column]: true},
});

export async function fetchArtistName(locale: string): Promise<string> {
    'use cache'

    const column = 'name';
    cacheTag(column);

    const data = await cacheFetch(artistTableQuery, column, locale);
    return data || "";
}


export async function fetchArtistProfession(locale: string): Promise<string> {
    'use cache'

    const column = 'profession';
    cacheTag(column);

    const data = await cacheFetch(artistTableQuery, column, locale);
    return data || "";
}

export async function fetchBiography(locale: string): Promise<string[] | undefined> {
    'use cache'

    const column = 'biography';
    cacheTag(column);

    const data = await cacheFetch(artistTableQuery, column, locale);
    return data || "";
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