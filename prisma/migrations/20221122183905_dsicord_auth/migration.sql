/*
  Warnings:

  - Made the column `discordId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Profil" DROP CONSTRAINT "Profil_userId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "discordId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Profil" ADD CONSTRAINT "Profil_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
