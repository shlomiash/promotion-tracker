ALTER TABLE "discounts" RENAME COLUMN "emailVerified" TO "CreatedAt";--> statement-breakpoint
ALTER TABLE "discounts" ALTER COLUMN "id" SET DATA TYPE text;