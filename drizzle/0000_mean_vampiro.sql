CREATE TABLE "estimates" (
	"id" text PRIMARY KEY NOT NULL,
	"reference" text NOT NULL,
	"service" text NOT NULL,
	"customer_name" text NOT NULL,
	"phone" text NOT NULL,
	"area" text NOT NULL,
	"description" text NOT NULL,
	"preferred_date" text,
	"photo_keys" jsonb NOT NULL,
	"status" text DEFAULT 'received' NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	CONSTRAINT "estimates_reference_unique" UNIQUE("reference")
);
