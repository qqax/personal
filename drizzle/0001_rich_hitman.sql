ALTER TABLE "records"
    ALTER COLUMN "record_type" SET DATA TYPE text USING record_type::text;--> statement-breakpoint
ALTER TABLE "records"
    ALTER COLUMN "record_type" SET DATA TYPE record_types USING record_type::record_types;--> statement-breakpoint
DROP TYPE "public"."not_related_record_types";