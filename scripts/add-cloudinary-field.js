import pg from "pg";
import "dotenv/config";

const { Client } = pg;

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  try {
    // Check if column already exists
    const check = await client.query(`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'Ritual' AND column_name = 'cloudinaryPublicId'
    `);

    if (check.rows.length === 0) {
      await client.query(`ALTER TABLE "Ritual" ADD COLUMN "cloudinaryPublicId" TEXT`);
      console.log("Added cloudinaryPublicId column to Ritual table.");
    } else {
      console.log("cloudinaryPublicId column already exists. Skipping.");
    }
  } catch (err) {
    console.error("Migration failed:", err.message);
    throw err;
  } finally {
    await client.end();
  }
}

main();
