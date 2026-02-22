import pg from "pg";
import { hash } from "bcrypt";
import "dotenv/config";

const { Client } = pg;

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  console.log("Adding password column to User table...");

  // Add the column if it doesn't exist
  await client.query(`
    ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "password" TEXT;
  `);

  // Hash the default password
  const defaultHash = await hash("admin123", 10);

  // Set default password for any users that don't have one
  await client.query(
    `UPDATE "User" SET "password" = $1 WHERE "password" IS NULL`,
    [defaultHash]
  );

  // Make the column NOT NULL now that all rows have a value
  await client.query(`
    ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;
  `);

  console.log("Migration complete. All existing users now have password = admin123 (hashed).");

  await client.end();
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
