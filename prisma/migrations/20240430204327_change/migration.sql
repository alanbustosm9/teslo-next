/*
  Warnings:

  - You are about to drop the column `zipCode` on the `OrderAddress` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `UserAddress` table. All the data in the column will be lost.
  - Added the required column `postalCode` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "isPaid" DROP DEFAULT;

-- AlterTable
ALTER TABLE "OrderAddress" DROP COLUMN "zipCode",
ADD COLUMN     "postalCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "zipCode",
ADD COLUMN     "postalCode" TEXT NOT NULL;
