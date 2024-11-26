CREATE TABLE IF NOT EXISTS "artist" (
	"id" boolean PRIMARY KEY DEFAULT true NOT NULL,
	"name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"biography" text[] NOT NULL,
	"name_ru" varchar(255),
	"last_name_ru" varchar(255),
	"biography_ru" text[],
	CONSTRAINT "one_row_unique" CHECK ("artist"."id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "concerts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "concerts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"date" date NOT NULL,
	"place" text NOT NULL,
	"address" text NOT NULL,
	"short_description" text,
	"description" text,
	"place_ru" text,
	"address_ru" text,
	"short_description_ru" text,
	"description_ru" text,
	"poster" "bytea",
	"link" text,
	"record_id" integer,
	CONSTRAINT "concerts_date_unique" UNIQUE("date")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contacts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "contacts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"service_id" integer NOT NULL,
	"contact" text NOT NULL,
	CONSTRAINT "contacts_contact_unique" UNIQUE("contact")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "news" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "news_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"errors" integer DEFAULT 0 NOT NULL,
	"is_valid" boolean DEFAULT true NOT NULL,
	CONSTRAINT "news_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "record_types" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "record_types_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"record_type" varchar(255) NOT NULL,
	CONSTRAINT "record_types_record_type_unique" UNIQUE("record_type")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "records" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "records_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"link" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"title_ru" text,
	"description_ru" text,
	"record_type_id" integer NOT NULL,
	CONSTRAINT "records_link_unique" UNIQUE("link"),
	CONSTRAINT "records_title_unique" UNIQUE("title"),
	CONSTRAINT "records_title_ru_unique" UNIQUE("title_ru")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "social" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "social_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"service" varchar(255) NOT NULL,
	CONSTRAINT "social_service_unique" UNIQUE("service")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "concerts" ADD CONSTRAINT "concerts_record_id_records_id_fk" FOREIGN KEY ("record_id") REFERENCES "public"."records"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contacts" ADD CONSTRAINT "contacts_service_id_social_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."social"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "records" ADD CONSTRAINT "records_record_type_id_record_types_id_fk" FOREIGN KEY ("record_type_id") REFERENCES "public"."record_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
