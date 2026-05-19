-- CreateEnum
CREATE TYPE "Category" AS ENUM ('VEGETABLES', 'FRUITS', 'MEAT', 'DAIRY', 'SPICES', 'OTHER');

-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('GRAMS', 'KILOGRAMS', 'LITERS', 'MILLILITERS', 'PIECES');

-- CreateTable
CREATE TABLE "ingredients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "unit" "Unit" NOT NULL,
    "pricePerUnit" DOUBLE PRECISION,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_ingredient" (
    "id" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "recipe_ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "oldPrice" INTEGER,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT NOT NULL,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "discount" BOOLEAN NOT NULL DEFAULT false,
    "type" TEXT NOT NULL,
    "screenSize" TEXT NOT NULL,
    "resolution" TEXT NOT NULL,
    "screenType" TEXT NOT NULL,
    "refreshRate" INTEGER NOT NULL,
    "cpu" TEXT NOT NULL,
    "cores" INTEGER NOT NULL,
    "gpuBrand" TEXT NOT NULL,
    "gpuType" TEXT NOT NULL,
    "gpuModel" TEXT NOT NULL,
    "vram" INTEGER NOT NULL,
    "ram" INTEGER NOT NULL,
    "ramType" TEXT NOT NULL,
    "ssd" INTEGER NOT NULL,
    "os" TEXT NOT NULL,
    "coating" TEXT NOT NULL,
    "matrixType" TEXT NOT NULL,
    "batteryType" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
