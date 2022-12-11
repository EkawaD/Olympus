/*
  Warnings:

  - You are about to drop the column `todoId` on the `CategoryTodo` table. All the data in the column will be lost.
  - Added the required column `categoryTodoId` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CategoryTodo" DROP CONSTRAINT "CategoryTodo_todoId_fkey";

-- AlterTable
ALTER TABLE "CategoryTodo" DROP COLUMN "todoId";

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "categoryTodoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_categoryTodoId_fkey" FOREIGN KEY ("categoryTodoId") REFERENCES "CategoryTodo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
