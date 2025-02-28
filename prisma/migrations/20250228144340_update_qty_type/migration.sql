/*
  Warnings:

  - You are about to drop the column `InRupess` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `customQty` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `regularQty` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "InRupess",
DROP COLUMN "customQty",
DROP COLUMN "regularQty",
ADD COLUMN     "Qty" DOUBLE PRECISION,
ADD COLUMN     "total" DOUBLE PRECISION;
