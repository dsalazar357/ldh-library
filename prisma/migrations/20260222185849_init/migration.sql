-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "degree" INTEGER NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ritual" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "degree" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Ritual_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Ritual" ADD CONSTRAINT "Ritual_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
