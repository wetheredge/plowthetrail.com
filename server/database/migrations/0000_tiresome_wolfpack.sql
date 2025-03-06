CREATE TABLE `reports` (
	`id` integer PRIMARY KEY NOT NULL,
	`lat` integer NOT NULL,
	`lon` integer NOT NULL,
	`condition` integer NOT NULL,
	`notes` text NOT NULL,
	`created_at` integer NOT NULL
);
