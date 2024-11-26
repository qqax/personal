ALTER TABLE "artist" ALTER COLUMN "profession" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "artist" ADD COLUMN "admin_path" text DEFAULT 'admin' NOT NULL;