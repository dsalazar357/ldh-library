import pg from "pg";
import "dotenv/config";

const { Client } = pg;

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  // Check if column already exists
  const check = await client.query(`
    SELECT column_name FROM information_schema.columns
    WHERE table_name = 'User' AND column_name = 'active'
  `);

  if (check.rows.length === 0) {
    await client.query(`ALTER TABLE "User" ADD COLUMN "active" BOOLEAN NOT NULL DEFAULT true`);
    console.log("Added 'active' column to User table (default: true).");
  } else {
    console.log("Column 'active' already exists. Skipping.");
  }

  await client.end();
}

main().catch(console.error);
