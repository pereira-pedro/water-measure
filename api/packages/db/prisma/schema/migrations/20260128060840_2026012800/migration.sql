/*
  Warnings:

  - You are about to drop the column `number` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `addresses` table. All the data in the column will be lost.
  - Added the required column `streetNumber` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "number",
DROP COLUMN "state",
ADD COLUMN     "province" VARCHAR(64),
ADD COLUMN     "streetNumber" VARCHAR(50) NOT NULL,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
