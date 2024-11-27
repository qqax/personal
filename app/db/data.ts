"use server"

import {drizzle} from "drizzle-orm/node-postgres";
import * as schema from "./schema"
import {Biography, Name} from "@/app/db/definitions";
import {cacheTag} from "next/dist/server/use-cache/cache-tag";
import facebookIcon from "../../public/icons/facebook.svg";
import youtubeIcon from "../../public/icons/youtube.svg";

const db = drizzle({
    connection: {
        connectionString: process.env.POSTGRES_URL,
    },

    schema
});

const NOT_DEFAULT_LOCALES = ["ru"];

function generateLocalePostfix(column: string, locale: string) {
    if (NOT_DEFAULT_LOCALES.includes(locale)) {
        return `${column}_${locale}`;
    }
    return column;
}

async function selectArtistName(locale: string): Promise<string> {
    let data: Name;

    const nameColumn = "name";
    const nameColumnWithLocale = generateLocalePostfix(nameColumn, locale);

    data = await db.query.artistTable.findFirst({
        columns: {[nameColumnWithLocale]: true}},
    ) as Name;

    if (!data?.name && NOT_DEFAULT_LOCALES.includes(locale)) {
        data = await db.query.artistTable.findFirst({
            columns: {[nameColumn]: true}},
        ) as Name;
    }

    return data?.name ?? "";
}

export async function fetchArtistName(locale: string): Promise<string> {
    'use cache'
    cacheTag('name');

    try {
        return await selectArtistName(locale);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the artist name.');
    }
}

async function selectBiography(locale: string): Promise<string[] | undefined> {
    const column = `biography`;
    const columnWithLocale = generateLocalePostfix(`biography`, locale);

    let data: Biography | undefined;

    data = await db.query.artistTable.findFirst({
        columns: {[columnWithLocale]: true},
    }) as Biography;

    if (!data?.biography && NOT_DEFAULT_LOCALES.includes(locale)) {
        data = await db.query.artistTable.findFirst({
            columns: {[column]: true},
        }) as Biography;
    }

    return data?.biography;
}

export async function fetchBiography(locale: string): Promise<string[] | undefined> {
    'use cache'
    cacheTag('biography');

    try {
        return await selectBiography(locale);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the artist biography.');
    }
}

export async function fetchSocial() {
    'use cache'
    cacheTag('biography');

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