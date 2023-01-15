-- CreateEnum
CREATE TYPE "Meal" AS ENUM ('MondayNoon', 'MondayEvening', 'TuesdayNoon', 'TuesdayEvening', 'WednesdayNoon', 'WednesdayEvening', 'ThursdayNoon', 'ThursdayEvening', 'FridayNoon', 'FridayEvening', 'SaturdayNoon', 'SaturdayEvening', 'SundayNoon', 'SundayEvening');

-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER,
    "name" TEXT NOT NULL,
    "tasks" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "hint" TEXT NOT NULL,
    "servings" INTEGER NOT NULL DEFAULT 4,
    "image" TEXT NOT NULL DEFAULT '/default_recipe.jpg',
    "meal" "Meal",

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER,
    "name" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "toBuy" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "needed" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_name_key" ON "Recipe"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_meal_key" ON "Recipe"("meal");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
