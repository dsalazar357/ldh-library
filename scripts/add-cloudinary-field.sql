-- Add cloudinaryPublicId column to Ritual table
ALTER TABLE "Ritual" ADD COLUMN IF NOT EXISTS "cloudinaryPublicId" TEXT;
