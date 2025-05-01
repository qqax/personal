CREATE TYPE "public"."contact_types" AS ENUM ('phone', 'email');--> statement-breakpoint
CREATE TYPE "public"."not_related_record_types" AS ENUM ('studio', 'workshop');--> statement-breakpoint
CREATE TYPE "public"."record_services" AS ENUM ('youtube');--> statement-breakpoint
CREATE TYPE "public"."record_types" AS ENUM ('concert', 'studio', 'workshop');--> statement-breakpoint
CREATE TYPE "public"."related_record_types" AS ENUM ('concert');--> statement-breakpoint
CREATE TYPE "public"."social_types" AS ENUM ('facebook', 'youtube', 'instagram', 'twitter', 'linkedin');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account"
(
    "userId"            text NOT NULL,
    "type"              text NOT NULL,
    "provider"          text NOT NULL,
    "providerAccountId" text NOT NULL,
    "refresh_token"     text,
    "access_token"      text,
    "expires_at"        integer,
    "token_type"        text,
    "scope"             text,
    "id_token"          text,
    "session_state"     text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authenticator"
(
    "credentialID"         text    NOT NULL,
    "userId"               text    NOT NULL,
    "providerAccountId"    text    NOT NULL,
    "credentialPublicKey"  text    NOT NULL,
    "counter"              integer NOT NULL,
    "credentialDeviceType" text    NOT NULL,
    "credentialBackedUp"   boolean NOT NULL,
    "transports"           text,
    CONSTRAINT "authenticator_credentialID_unique" UNIQUE ("credentialID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session"
(
    "sessionToken" text PRIMARY KEY NOT NULL,
    "userId"       text             NOT NULL,
    "expires"      timestamp        NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user"
(
    "id"            text PRIMARY KEY NOT NULL,
    "name"          text,
    "email"         text,
    "emailVerified" timestamp,
    "password"      text,
    "image"         text,
    CONSTRAINT "user_email_unique" UNIQUE ("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verification_token"
(
    "identifier" text      NOT NULL,
    "token"      text      NOT NULL,
    "expires"    timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "concert_records"
(
    "id"             integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "concert_records_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
    "uuid"           text              NOT NULL,
    "record_service" "record_services" NOT NULL,
    "concert_id"     integer           NOT NULL,
    CONSTRAINT "concert_records_uuid_unique" UNIQUE ("uuid")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "concerts"
(
    "id"                   integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "concerts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
    "date"                 timestamp NOT NULL,
    "place"                text      NOT NULL,
    "address"              text      NOT NULL,
    "short_description"    text,
    "description"          text,
    "place_ru"             text,
    "address_ru"           text,
    "short_description_ru" text,
    "description_ru"       text,
    "poster"               "bytea",
    "link"                 text,
    CONSTRAINT "concerts_date_unique" UNIQUE ("date")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "records"
(
    "id"                   integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "records_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
    "uuid"                 text                       NOT NULL,
    "date"                 timestamp                  NOT NULL,
    "short_description"    text                       NOT NULL,
    "short_description_ru" text,
    "description"          text                       NOT NULL,
    "description_ru"       text,
    "record_service"       "record_services"          NOT NULL,
    "record_type"          "not_related_record_types" NOT NULL,
    CONSTRAINT "records_uuid_unique" UNIQUE ("uuid"),
    CONSTRAINT "records_date_unique" UNIQUE ("date"),
    CONSTRAINT "records_short_description_unique" UNIQUE ("short_description"),
    CONSTRAINT "records_short_description_ru_unique" UNIQUE ("short_description_ru"),
    CONSTRAINT "records_description_unique" UNIQUE ("description"),
    CONSTRAINT "records_description_ru_unique" UNIQUE ("description_ru")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "artist"
(
    "id"            boolean PRIMARY KEY DEFAULT true    NOT NULL,
    "name"          varchar(255)                        NOT NULL,
    "biography"     text                                NOT NULL,
    "profession"    text                                NOT NULL,
    "profession_ru" text,
    "name_ru"       varchar(255),
    "biography_ru"  text,
    "admin_path"    text                DEFAULT 'admin' NOT NULL,
    CONSTRAINT "one_row_unique" CHECK ("artist"."id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contacts"
(
    "id"           integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "contacts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
    "contact_type" "contact_types" NOT NULL,
    "contact"      text            NOT NULL,
    CONSTRAINT "contacts_contact_unique" UNIQUE ("contact")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mailing_list"
(
    "id"       integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "mailing_list_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
    "email"    varchar(255)         NOT NULL,
    "errors"   integer DEFAULT 0    NOT NULL,
    "is_valid" boolean DEFAULT true NOT NULL,
    CONSTRAINT "mailing_list_email_unique" UNIQUE ("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "socials"
(
    "id"          integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "socials_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
    "social_type" "social_types" NOT NULL,
    "link"        text           NOT NULL,
    CONSTRAINT "socials_link_unique" UNIQUE ("link")
);
--> statement-breakpoint
DO
$$
    BEGIN
        ALTER TABLE "account"
            ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user" ("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
        WHEN duplicate_object THEN null;
    END
$$;
--> statement-breakpoint
DO
$$
    BEGIN
        ALTER TABLE "authenticator"
            ADD CONSTRAINT "authenticator_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user" ("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
        WHEN duplicate_object THEN null;
    END
$$;
--> statement-breakpoint
DO
$$
    BEGIN
        ALTER TABLE "session"
            ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user" ("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
        WHEN duplicate_object THEN null;
    END
$$;
--> statement-breakpoint
DO
$$
    BEGIN
        ALTER TABLE "concert_records"
            ADD CONSTRAINT "concert_records_concert_id_concerts_id_fk" FOREIGN KEY ("concert_id") REFERENCES "public"."concerts" ("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
        WHEN duplicate_object THEN null;
    END
$$;
