/*
  Warnings:

  - You are about to drop the column `groupId` on the `Anon` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Anon" DROP CONSTRAINT "Anon_groupId_fkey";

-- AlterTable
ALTER TABLE "Anon" DROP COLUMN "groupId";

-- CreateTable
CREATE TABLE "_AnonToGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AnonToGroup_AB_unique" ON "_AnonToGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_AnonToGroup_B_index" ON "_AnonToGroup"("B");

-- AddForeignKey
ALTER TABLE "_AnonToGroup" ADD CONSTRAINT "_AnonToGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Anon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnonToGroup" ADD CONSTRAINT "_AnonToGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
