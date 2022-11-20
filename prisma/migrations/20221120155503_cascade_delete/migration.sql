-- DropForeignKey
ALTER TABLE "Debt" DROP CONSTRAINT "Debt_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "Debt" DROP CONSTRAINT "Debt_userId_fkey";

-- AddForeignKey
ALTER TABLE "Debt" ADD CONSTRAINT "Debt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debt" ADD CONSTRAINT "Debt_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
