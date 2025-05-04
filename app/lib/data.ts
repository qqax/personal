"use server";

import { artistTable, contactsTable, mailingListTable, socialsTable } from "./schema/common";
import { concertRecordsTable, concertsTable, recordsTable } from "./schema/concert-records";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import type {
    ArtistData,
    Biography,
    ConcertDescription,
    Concerts,
    Contacts,
    Name,
    Profession,
    Records,
    Socials,
} from "@/app/lib/definitions";
import { desc, eq, sql } from "drizzle-orm";
import { PgColumn, type PgTableWithColumns, union } from "drizzle-orm/pg-core";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { db } from "@/app/lib/connection";
import { NotDefaultLocales } from "@/i18n/routing";
import { type contactType, type recordType, relatedRecordTypesEnum } from "@/app/lib/schema/enums";

type Columns = "name" | "biography" | "profession";
type CacheTag = Columns | "concerts" | "socials" | "contacts" | "records";

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
                columns: { [column.name]: true },
                extras: {
                    [column.name]: selectTranslated(artistTable, column.name, locale),
                },
            });

        return data?.[column.name] as ArtistData;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error(`Failed to fetch the ${column}.`);
    }
};

export async function fetchArtistName(locale: string): Promise<Name> {
    "use cache";

    const column: Columns = "name";
    cacheTag(column);

    try {
        return await artistTableQuery(artistTable[column], locale) as Name;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error(`Failed to fetch the ${column}.`);
    }
}

export async function fetchArtistProfession(locale: string): Promise<Profession> {
    "use cache";

    const column: Columns = "profession";
    cacheTag(column);

    try {
        return await artistTableQuery(artistTable[column], locale) as Profession;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error(`Failed to fetch the ${column}.`);
    }
}

export async function fetchBiography(locale: string): Promise<Biography> {
    "use cache";

    const column: Columns = "biography";
    cacheTag(column);

    try {
        return await artistTableQuery(artistTable[column], locale) as Biography;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error(`Failed to fetch the ${column}.`);
    }
}

export async function fetchSocial(): Promise<Socials> {
    "use cache";

    const tag: CacheTag = "socials";
    cacheTag(tag);

    try {
        return db.select({
            url: socialsTable.link,
            type: socialsTable.social_type,
        }).from(socialsTable)
            .orderBy(desc(socialsTable.social_type));
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch the socials.");
    }
}

export async function fetchContacts(): Promise<Contacts> {
    "use cache";

    const tag: CacheTag = "contacts";
    cacheTag(tag);

    try {
        const contacts = await db.select({
            contacts: contactsTable.contact,
            type: contactsTable.contact_type,
        }).from(contactsTable)
            .orderBy(contactsTable.contact_type);

        return contacts.reduce((acc: Record<string, string[]>, { contacts, type: keyType }) => {
            const key = keyType as contactType;
            if (acc[key]) {
                acc[keyType as string] = [contacts, ...acc[keyType as string] as string[]];
            } else {
                acc[keyType as string] = [contacts];
            }
            return acc;
        }, {}) as Contacts;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch the artist contacts.");
    }
}

export async function fetchConcerts(locale: string): Promise<Concerts> {
    "use cache";

    const tag: CacheTag = "concerts";
    cacheTag(tag);
    cacheLife("days");

    try {
        const concerts: Concerts = await db.select({
            id: sql<string>`to_char
                (${concertsTable.date}, 'DD_Mon_YY_HH24_MI')`.as("id"),
            date: concertsTable.date,
            place: selectTranslated(concertsTable, "place", locale),
            short_description: selectTranslated(concertsTable, "short_description", locale),
        }).from(concertsTable)
            .orderBy(concertsTable.date);


        return concerts as Concerts;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch concerts.");
    }
}

export async function fetchConcertDescription(id: string, locale: string): Promise<ConcertDescription> {
    "use cache";
    const tag: CacheTag = "concerts";
    cacheTag(tag);

    try {
        return await db.query.concertsTable.findFirst({
            columns: {
                date: true,
                link: true,
                poster: true,
            },
            with: {
                records: {
                    columns: {
                        uuid: true,
                        record_service: true,
                    },
                },
            },
            extras: {
                place: selectTranslated(concertsTable, "place", locale),
                address: selectTranslated(concertsTable, "address", locale),
                description: selectTranslated(concertsTable, "description", locale),
            },
            where: (concertsTable, { eq }) => eq(concertsTable.date, sql.raw(`to_timestamp('${id}', 'DD_Mon_YY_HH24_MI')::timestamp`)),
        });
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error(`Failed to fetch the concert's description.`);
    }
}

export async function fetchRecords(locale: string): Promise<Records> {
    "use cache";
    const tag: CacheTag = "records";
    cacheTag(tag);

    try {
        const concertRecordsSelect = db.select({
            date: concertsTable.date,
            uuid: concertRecordsTable.uuid,
            record_type: sql<recordType>`${relatedRecordTypesEnum.enumValues[0]}`.as("record_type"),
            record_service: concertRecordsTable.record_service,
            short_description: selectTranslated(concertsTable, "short_description", locale),
            description: selectTranslated(concertsTable, "description", locale),
        }).from(concertRecordsTable)
            .leftJoin(concertsTable, eq(concertsTable.id, concertRecordsTable.concert_id));

        const recordsSelect = db.select({
            date: recordsTable.date,
            uuid: recordsTable.uuid,
            record_type: recordsTable.record_type,
            record_service: recordsTable.record_service,
            short_description: selectTranslated(recordsTable, "short_description", locale),
            description: selectTranslated(recordsTable, "description", locale),
        }).from(recordsTable);

        const sq = union(concertRecordsSelect, recordsSelect).as("sq");

        return db.select().from(sq).orderBy(sq.date);
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch the records.");
    }
}

export async function insertEmail(email: string): Promise<boolean> {
    try {
        await db.insert(mailingListTable).values({ email }).onConflictDoNothing();
        return true;
    } catch (error) {
        console.error("Database Error:", error);
        return false;
    }
}