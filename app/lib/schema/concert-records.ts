import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { recordServicesEnum, recordTypesEnum } from "@/app/lib/schema/enums";
import { bytea } from "@/app/lib/schema/custom_types";

export const concertsTable = pgTable(
    "concerts",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        date: timestamp().notNull().unique(),
        place: text().notNull(),
        address: text().notNull(),
        short_description: text(),
        description: text(),
        place_ru: text(),
        address_ru: text(),
        short_description_ru: text(),
        description_ru: text(),
        poster: bytea(),
        link: text(),
    },
);
export const concertRecordsTable = pgTable(
    "concert_records",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        uuid: text().notNull().unique(),
        record_service: recordServicesEnum().notNull(),
        concert_id: integer("concert_id").notNull().references(() => concertsTable.id, { onDelete: 'cascade' }).notNull(),
    },
);
export const concertRelations = relations(concertsTable, ({ many }) => ({
    records: many(concertRecordsTable),
}));
export const concertRecordsRelations = relations(concertRecordsTable, ({ one }) => ({
    records: one(concertsTable, {
        fields: [concertRecordsTable.concert_id],
        references: [concertsTable.id],
    }),
}));
export const recordsTable = pgTable(
    "records",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        uuid: text().notNull().unique(),
        date: timestamp().notNull().unique(),
        short_description: text().notNull().unique(),
        short_description_ru: text().unique(),
        description: text().notNull().unique(),
        description_ru: text().unique(),
        record_service: recordServicesEnum().notNull(),
        record_type: recordTypesEnum().notNull(),
    },
);