import pg from "pg";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pg;

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  console.log("Connected to database");

  // Check if password column already exists
  const checkCol = await client.query(`
    SELECT column_name FROM information_schema.columns 
    WHERE table_name = 'User' AND column_name = 'password'
  `);

  if (checkCol.rows.length > 0) {
    console.log("Password column already exists, skipping ALTER TABLE.");
  } else {
    // Add password column with a temporary default
    await client.query(`
      ALTER TABLE "User" ADD COLUMN "password" TEXT NOT NULL DEFAULT 'temp'
    `);
    console.log("Added password column to User table.");
  }

  // Hash admin123 with bcrypt
  const hash = await bcrypt.hash("admin123", 10);
  console.log("Generated bcrypt hash for default password");

  // Update all users that still have the temp/placeholder password
  const result = await client.query(
    `UPDATE "User" SET "password" = $1 WHERE "password" = 'temp' OR "password" = ''`,
    [hash]
  );
  console.log(`Updated ${result.rowCount} user(s) with hashed password`);

  await client.end();
  console.log("Migration complete!");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
