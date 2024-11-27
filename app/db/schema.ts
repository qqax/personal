import {check, boolean, integer, pgTable, text, varchar, customType, date} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";

const bytea = customType<{ data: Buffer; notNull: false; default: false }>({
    dataType() {
        return "bytea";
    },
});

export const artistTable = pgTable(
    "artist",
    {
        id: boolean().primaryKey().default(true),
        name: varchar({length: 255}).notNull(),
        biography: text().array().notNull(),
        profession: text().notNull(),
        name_ru: varchar({length: 255}),
        last_name_ru: varchar({length: 255}),
        biography_ru: text().array(),
        admin_path: text().notNull().default("admin"),
    },
    (table) => ({
        checkConstraint: check("one_row_unique", sql`${table.id}`),
    }),
);

export const newsTable = pgTable(
    "news",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        email: varchar({length: 255}).notNull().unique(),
        errors: integer().notNull().default(0),
        is_valid: boolean().notNull().default(true),
    },
);

export const socialTable = pgTable(
    "social",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        service: varchar({length: 255}).notNull().unique(),
    },
);

export const contactsTable = pgTable(
    "contacts",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        service_id: integer().references(() => socialTable.id, {onDelete: 'cascade'}).notNull(),
        contact: text().notNull().unique(),
    },
);

export const concertsTable = pgTable(
    "concerts",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        date: date().notNull().unique(),
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
        record_id: integer().references(() => recordsTable.id, {onDelete: 'cascade'}),
    },
);

export const recordTypesTable = pgTable(
    "record_types",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        record_type: varchar({length: 255}).notNull().unique(),
    },
);

export const recordsTable = pgTable(
    "records",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        link: text().notNull().unique(),
        title: text().notNull().unique(),
        description: text(),
        title_ru: text().unique(),
        description_ru: text(),
        record_type_id: integer().references(() => recordTypesTable.id, {onDelete: 'cascade'}).notNull(),
    },
);