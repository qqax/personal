"use server";

import {
    concertsTable,
    concertRecordsTable,
    mailingListTable,
    artistTable,
    socialsTable,
    contactsTable,
    recordsTable
} from "./schema";
import {cacheTag} from "next/dist/server/use-cache/cache-tag";
import {
    ArtistData,
    Biography,
    ConcertDescription,
    Concerts,
    ConcertsData, Contacts,
    Name,
    Profession,
    Records, Socials,
} from "@/app/lib/definitions";
import {desc, eq, sql} from "drizzle-orm";
import {PgColumn, PgTableWithColumns, union} from "drizzle-orm/pg-core";
import {cacheLife} from "next/dist/server/use-cache/cache-life";
import {db} from "@/app/lib/connection";
import {NotDefaultLocales} from "@/i18n/routing";
import {contactType, recordType, relatedRecordTypesEnum} from "@/app/lib/enums";


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

    try {
        return await artistTableQuery(artistTable[column], locale) as Name;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch the ${column}.`);
    }
}

export async function fetchArtistProfession(locale: string): Promise<Profession> {
    'use cache';

    const column = 'profession';
    cacheTag(column);

    try {
        return await artistTableQuery(artistTable[column], locale) as Profession;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch the ${column}.`);
    }
}

export async function fetchBiography(locale: string): Promise<Biography> {
    'use cache';

    const column = 'biography';
    cacheTag(column);

    try {
        return await artistTableQuery(artistTable[column], locale) as Biography;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch the ${column}.`);
    }
}

export async function fetchSocial(): Promise<Socials> {
    'use cache';
    cacheTag('social');

    try {
        return db.select({
            url: socialsTable.link,
            type: socialsTable.social_type,
        }).from(socialsTable)
            .orderBy(desc(socialsTable.social_type));
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the socials.');
    }
}

export async function fetchContacts(): Promise<Contacts> {
    'use cache';
    cacheTag('contacts');

    try {
        const contacts = await db.select({
            contacts: contactsTable.contact,
            type: contactsTable.contact_type,
        }).from(contactsTable)
            .orderBy(contactsTable.contact_type);

        return contacts.reduce((acc: Record<string, string[]>, {contacts, type}) => {
            const key = type as contactType;
            if (acc[key]) {
                acc[type as string] = [contacts, ...acc[type as string]];
            } else {
                acc[type as string] = [contacts];
            }
            return acc;
        }, {}) as Contacts;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the artist contacts.');
    }
}

export async function fetchConcerts(locale: string): Promise<ConcertsData> {
    'use cache';
    cacheTag('concert');
    cacheLife('days');

    try {
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
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch concerts.');
    }
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
                        title: selectTranslated(concertRecordsTable, "title", locale),
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

export async function fetchRecords(locale: string): Promise<Records> {
    'use cache';
    cacheTag('record');

    try {
        const concertRecordsSelect = db.select({
            date: concertsTable.date,
            uuid: concertRecordsTable.uuid,
            record_type: sql<recordType>`${relatedRecordTypesEnum.enumValues[0]}`,
            record_service: concertRecordsTable.record_service,
            short_description: selectTranslated(concertsTable, "short_description", locale),
            description: selectTranslated(concertsTable, "description", locale),
        }).from(concertRecordsTable)
            .leftJoin(concertsTable, eq(concertsTable.id, concertRecordsTable.concert_id));

        const recordsSelect = db.select({
            date: recordsTable.date,
            uuid: recordsTable.uuid,
            record_type: recordsTable.record_type,
            record_service: concertRecordsTable.record_service,
            short_description: selectTranslated(recordsTable, "short_description", locale),
            description: selectTranslated(recordsTable, "description", locale),
        }).from(recordsTable);

        return union(concertRecordsSelect, recordsSelect)
            .orderBy(sql`"date" DESC`);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the records.');
    }
}

export async function insertEmail(email: string): Promise<boolean> {
    try {
        await db.insert(mailingListTable).values({email}).onConflictDoNothing();
        return true;
    } catch (error) {
        console.error('Database Error:', error);
        return false;
    }
}