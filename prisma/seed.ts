import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const userData: Prisma.UserCreateInput[] = [
    {
      username: "dsalazar357",
      email: "danae.salazar357@gmail.com",
      password: hashedPassword,
      admin: true,
      degree: 14,
      rituals: {
        create: [
          {
            title: "Prisma Test Ritual",
            degree: 1,
            url: "https://something.org",
            country: "Mexico",
          },
        ],
      },
    },
  ];

  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
