-- CreateTable
CREATE TABLE "UserT" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "UserT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payerId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Debts" (
    "userId" INTEGER NOT NULL,
    "transactionId" INTEGER NOT NULL,

    CONSTRAINT "Debts_pkey" PRIMARY KEY ("userId","transactionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserT_email_key" ON "UserT"("email");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "UserT"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debts" ADD CONSTRAINT "Debts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debts" ADD CONSTRAINT "Debts_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
