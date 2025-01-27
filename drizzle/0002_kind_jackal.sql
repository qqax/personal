ALTER TABLE "records" ADD COLUMN "date" timestamp DEFAULT '2025-01-27 13:51:10.636' NOT NULL;--> statement-breakpoint
ALTER TABLE "records" ADD CONSTRAINT "records_date_unique" UNIQUE("date");