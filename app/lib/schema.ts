import {
    boolean,
    check,
    customType,
    integer,
    pgTable,
    primaryKey,
    text,
    timestamp,
    varchar
} from "drizzle-orm/pg-core";
import {relations, sql} from "drizzle-orm";
import {AdapterAccountType} from "next-auth/adapters";
import {contactTypesEnum, notRelatedRecordTypesEnum, recordServicesEnum, socialTypesEnum} from "@/app/lib/enums";


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
        biography: text().notNull(),
        profession: text().notNull(),
        profession_ru: text(),
        name_ru: varchar({length: 255}),
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
        email: varchar({length: 255}).notNull().unique(),
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
        concert_id: integer("concert_id").notNull().references(() => concertsTable.id, {onDelete: 'cascade'}).notNull(),
    },
);

export const concertRelations = relations(concertsTable, ({many}) => ({
    records: many(concertRecordsTable),
}));

export const concertRecordsRelations = relations(concertRecordsTable, ({one}) => ({
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
        record_type: notRelatedRecordTypesEnum().notNull(),
    },
);

export const users = pgTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", {mode: "date"}),
    password: text("password"),
    image: text("image"),
})

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, {onDelete: "cascade"}),
        type: text("type").$type<AdapterAccountType>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => [
        {
            compoundKey: primaryKey({
                columns: [account.provider, account.providerAccountId],
            }),
        },
    ]
)

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, {onDelete: "cascade"}),
    expires: timestamp("expires", {mode: "date"}).notNull(),
})

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", {mode: "date"}).notNull(),
    },
    (verificationToken) => [
        {
            compositePk: primaryKey({
                columns: [verificationToken.identifier, verificationToken.token],
            }),
        },
    ]
)

export const authenticators = pgTable(
    "authenticator",
    {
        credentialID: text("credentialID").notNull().unique(),
        userId: text("userId")
            .notNull()
            .references(() => users.id, {onDelete: "cascade"}),
        providerAccountId: text("providerAccountId").notNull(),
        credentialPublicKey: text("credentialPublicKey").notNull(),
        counter: integer("counter").notNull(),
        credentialDeviceType: text("credentialDeviceType").notNull(),
        credentialBackedUp: boolean("credentialBackedUp").notNull(),
        transports: text("transports"),
    },
    (authenticator) => [
        {
            compositePK: primaryKey({
                columns: [authenticator.userId, authenticator.credentialID],
            }),
        },
    ]
)
