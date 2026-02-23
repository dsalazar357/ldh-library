import pg from "pg";

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });

async function main() {
  await client.connect();

  // Check if column "country" exists
  const check = await client.query(`
    SELECT column_name FROM information_schema.columns
    WHERE table_name = 'Ritual' AND column_name = 'country'
  `);

  if (check.rows.length > 0) {
    await client.query(`ALTER TABLE "Ritual" RENAME COLUMN "country" TO "language"`);
    console.log("Renamed column 'country' to 'language' on Ritual table.");
  } else {
    console.log("Column 'country' not found (already renamed or doesn't exist). Skipping.");
  }

  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
