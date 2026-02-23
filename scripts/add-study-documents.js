import pg from "pg";
import "dotenv/config";

const { Client } = pg;

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  // Check if table already exists
  const check = await client.query(`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_name = 'StudyDocument'
    );
  `);

  if (check.rows[0].exists) {
    console.log("StudyDocument table already exists, skipping.");
    await client.end();
    return;
  }

  await client.query(`
    CREATE TABLE "StudyDocument" (
      "id" SERIAL PRIMARY KEY,
      "title" TEXT NOT NULL,
      "organization" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "url" TEXT NOT NULL,
      "cloudinaryPublicId" TEXT,
      "authorId" INTEGER NOT NULL,
      CONSTRAINT "StudyDocument_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE
    );
  `);

  console.log("StudyDocument table created successfully.");
  await client.end();
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
