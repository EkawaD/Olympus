/*
  Warnings:

  - You are about to drop the column `discordId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_discordId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "discordId";

-- CreateTable
CREATE TABLE "Anon" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "pseudo" TEXT NOT NULL DEFAULT 'pseudo',
    "avatar" TEXT NOT NULL DEFAULT '/avatar.jpg',

    CONSTRAINT "Anon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Anon_userId_key" ON "Anon"("userId");

-- AddForeignKey
ALTER TABLE "Anon" ADD CONSTRAINT "Anon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
