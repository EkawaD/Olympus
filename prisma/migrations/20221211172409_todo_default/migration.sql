-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_categoryTodoId_fkey";

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_categoryTodoId_fkey" FOREIGN KEY ("categoryTodoId") REFERENCES "CategoryTodo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
