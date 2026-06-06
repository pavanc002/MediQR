CREATE TABLE `medicines` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`unique_code` text NOT NULL,
	`name` text NOT NULL,
	`strength` text NOT NULL,
	`mfg_date` text NOT NULL,
	`batch_number` text NOT NULL,
	`company` text NOT NULL,
	`expiry_date` text NOT NULL,
	`price` real NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `medicines_unique_code_unique` ON `medicines` (`unique_code`);