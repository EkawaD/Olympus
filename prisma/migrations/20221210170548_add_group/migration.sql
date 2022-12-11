/*
  Warnings:

  - You are about to drop the column `payerId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `payer` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_payerId_fkey";

-- AlterTable
ALTER TABLE "Anon" ADD COLUMN     "groupId" INTEGER;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "payerId",
ADD COLUMN     "groupId" INTEGER,
ADD COLUMN     "payer" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anon" ADD CONSTRAINT "Anon_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
