/*
  Warnings:

  - You are about to drop the column `postalCode` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `streetNumber` on the `addresses` table. All the data in the column will be lost.
  - Added the required column `postal_code` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street_number` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "postalCode",
DROP COLUMN "streetNumber",
ADD COLUMN     "postal_code" VARCHAR(16) NOT NULL,
ADD COLUMN     "street_number" VARCHAR(50) NOT NULL;
