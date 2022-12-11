/*
  Warnings:

  - You are about to drop the column `payees` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `payee` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "payees",
ADD COLUMN     "payee" TEXT NOT NULL;
