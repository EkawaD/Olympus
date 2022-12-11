/*
  Warnings:

  - You are about to drop the `Debt` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Debt" DROP CONSTRAINT "Debt_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "Debt" DROP CONSTRAINT "Debt_userId_fkey";

-- DropTable
DROP TABLE "Debt";
