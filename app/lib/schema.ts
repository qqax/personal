import {boolean, customType, integer, pgTable, primaryKey, text, timestamp, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {AdapterAccountType} from "next-auth/adapters";

const bytea = customType<{ data: Buffer; notNull: false; default: false }>({
    dataType() {
        return "bytea";
    },
});

export const configTable = pgTable(
    "config",
    {
        id: boolean().primaryKey().default(true),
        key: varchar({length: 255}).notNull().unique(),
        value: varchar({length: 255}).notNull(),
    }
)

export const mailingListTable = pgTable(
    "mailing_list",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        email: varchar({length: 255}).notNull().unique(),
        errors: integer().notNull().default(0),
        is_valid: boolean().notNull().default(true),
    },
);

export const contactTypesTable = pgTable(
    "contact_types",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        contact_type: varchar({length: 255}).notNull().unique(),
    },
);

export const contactsTable = pgTable(
    "contacts",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        contact_type_id: integer().references(() => contactTypesTable.id, {onDelete: 'cascade'}).notNull(),
        contact: text().notNull().unique(),
    },
);

export const socialTypesTable = pgTable(
    "social_types",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        social_type: varchar({length: 255}).notNull().unique(),
    },
);

export const socialsTable = pgTable(
    "socials",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        social_type_id: integer().references(() => socialTypesTable.id, {onDelete: 'cascade'}).notNull(),
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
        record_id: integer().references(() => recordsTable.id, {onDelete: 'cascade'}),
    },
);

export const concertRelations = relations(concertsTable, ({one}) => ({
    recordsTable: one(recordsTable, {
        fields: [concertsTable.record_id],
        references: [recordsTable.id],
    }),
}));

export const recordTypesTable = pgTable(
    "record_types",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        record_type: varchar({length: 255}).notNull().unique(),
    },
);


export const recordServicesTable = pgTable(
    "record_services",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        record_service: varchar({length: 255}).notNull().unique(),
    },
);

export const recordsTable = pgTable(
    "records",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        uuid: text().notNull().unique(),
        date: timestamp().array().notNull().unique(),
        record_service_id: integer().references(() => recordServicesTable.id, {onDelete: 'cascade'}).notNull(),
        record_type_id: integer().references(() => recordTypesTable.id, {onDelete: 'cascade'}).notNull(),
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
