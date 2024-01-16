ALTER TABLE "folders" RENAME COLUMN "folder_id" TO "id";--> statement-breakpoint
ALTER TABLE "files" DROP CONSTRAINT "files_folder_id_folders_folder_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "files" ADD CONSTRAINT "files_folder_id_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."folders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
