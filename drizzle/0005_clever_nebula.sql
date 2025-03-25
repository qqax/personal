ALTER TABLE "records" RENAME COLUMN "link" TO "uuid";--> statement-breakpoint
ALTER TABLE "records" DROP CONSTRAINT "records_link_unique";--> statement-breakpoint
ALTER TABLE "records" DROP CONSTRAINT "records_title_unique";--> statement-breakpoint
ALTER TABLE "records" DROP CONSTRAINT "records_title_ru_unique";--> statement-breakpoint
ALTER TABLE "artist" ALTER COLUMN "biography" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "artist" ALTER COLUMN "biography_ru" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "records" ADD COLUMN "date" timestamp[] NOT NULL;--> statement-breakpoint
ALTER TABLE "records" DROP COLUMN IF EXISTS "title";--> statement-breakpoint
ALTER TABLE "records" DROP COLUMN IF EXISTS "description";--> statement-breakpoint
ALTER TABLE "records" DROP COLUMN IF EXISTS "title_ru";--> statement-breakpoint
ALTER TABLE "records" DROP COLUMN IF EXISTS "description_ru";--> statement-breakpoint
ALTER TABLE "records" ADD CONSTRAINT "records_uuid_unique" UNIQUE("uuid");--> statement-breakpoint
ALTER TABLE "records" ADD CONSTRAINT "records_date_unique" UNIQUE("date");