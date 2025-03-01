/*
  Warnings:

  - You are about to drop the column `Qty` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Offers` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "Qty",
DROP COLUMN "category",
DROP COLUMN "image",
DROP COLUMN "name",
DROP COLUMN "price";

-- DropTable
DROP TABLE "Offers";

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "offerId" TEXT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "Qty" DOUBLE PRECISION,
    "category" TEXT NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
