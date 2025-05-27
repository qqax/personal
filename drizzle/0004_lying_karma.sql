CREATE TYPE "public"."local" AS ENUM('en', 'ru');--> statement-breakpoint
ALTER TABLE "mailing_list" ADD COLUMN "locale" "local" DEFAULT 'en' NOT NULL;--> statement-breakpoint
ALTER TABLE "mailing_list" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;