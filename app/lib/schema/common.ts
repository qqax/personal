import { boolean, check, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { contactTypesEnum, socialTypesEnum } from "@/app/lib/schema/enums";

export const artistTable = pgTable(
    "artist",
    {
        id: boolean().primaryKey().default(true),
        name: varchar({ length: 255 }).notNull(),
        biography: text().notNull(),
        profession: text().notNull(),
        profession_ru: text(),
        name_ru: varchar({ length: 255 }),
        biography_ru: text(),
        admin_path: text().notNull().default("admin"),
    },
    (table) => ({
        checkConstraint: check("one_row_unique", sql`${table.id}`),
    }),
);

export const mailingListTable = pgTable(
    "mailing_list",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        email: varchar({ length: 255 }).notNull().unique(),
        errors: integer().notNull().default(0),
        is_valid: boolean().notNull().default(true),
    },
);

export const contactsTable = pgTable(
    "contacts",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        contact_type: contactTypesEnum().notNull(),
        contact: text().notNull().unique(),
    },
);

export const socialsTable = pgTable(
    "socials",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        social_type: socialTypesEnum().notNull(),
        link: text().notNull().unique(),
    },
);

