ALTER TABLE "estimates" ADD COLUMN "admin_notes" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "estimates" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;
