"use server"

import {drizzle} from "drizzle-orm/node-postgres";
import {artistTable} from "@/app/db/schema";
import {sql} from "drizzle-orm";
import * as schema from "./schema"
import {Biography} from "@/app/db/definitions";
import {cacheTag} from "next/dist/server/use-cache/cache-tag";
import facebookIcon from "../../public/icons/facebook.svg";
import youtubeIcon from "../../public/icons/youtube.svg";

const db = drizzle({
    connection: {
        connectionString: process.env.POSTGRES_URL,
    },

    schema
});

async function selectArtistName(): Promise<string | undefined> {
    const data = await db.query.artistTable.findFirst({
        extras: {
            full_name: sql<string>`CONCAT_WS(' ', ${artistTable.name}, ${artistTable.last_name})`.as('full_name'),
        },
    });

    return data?.full_name;
}

export async function fetchArtistName() {
    'use cache'
    cacheTag('name');

    try {
        return await selectArtistName();
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the artist name.');
    }
}

async function selectBiography(): Promise<Biography | undefined> {
    const data = await db.query.artistTable.findFirst({
        columns: {"biography": true},
    });

    return data?.biography;
}

export async function fetchBiography() {
    'use cache'
    cacheTag('biography');

    try {
        return await selectBiography();
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