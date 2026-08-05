CREATE TABLE `estimates` (
	`id` text PRIMARY KEY NOT NULL,
	`reference` text NOT NULL,
	`service` text NOT NULL,
	`customer_name` text NOT NULL,
	`phone` text NOT NULL,
	`area` text NOT NULL,
	`description` text NOT NULL,
	`preferred_date` text,
	`photo_keys` text NOT NULL,
	`status` text DEFAULT 'received' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `estimates_reference_unique` ON `estimates` (`reference`);