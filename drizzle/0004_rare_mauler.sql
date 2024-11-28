ALTER TABLE "artist" ADD COLUMN "profession_ru" text;--> statement-breakpoint
ALTER TABLE "artist" DROP COLUMN IF EXISTS "last_name_ru";