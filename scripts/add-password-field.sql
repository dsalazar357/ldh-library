-- Add password field to User table
-- Default is bcrypt hash of "admin123"
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "password" TEXT NOT NULL DEFAULT '$2b$10$EIXe0e0e0e0e0e0e0e0e0uYmY3PqFJGzK8nVQpF3pKr6O3P3fN6Gy';

-- Update existing users with the default hash
-- (this will be properly hashed in the seed, but ensures existing rows have a value)
UPDATE "User" SET "password" = '$2b$10$EIXe0e0e0e0e0e0e0e0e0uYmY3PqFJGzK8nVQpF3pKr6O3P3fN6Gy' WHERE "password" = '$2b$10$EIXe0e0e0e0e0e0e0e0e0uYmY3PqFJGzK8nVQpF3pKr6O3P3fN6Gy' OR "password" IS NULL;
