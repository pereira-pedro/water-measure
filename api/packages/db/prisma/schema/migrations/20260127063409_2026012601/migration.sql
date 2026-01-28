/*
  Warnings:

  - You are about to alter the column `street` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `neighborhood` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(64)`.
  - You are about to alter the column `city` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.
  - You are about to alter the column `state` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(64)`.
  - You are about to alter the column `country` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(8)`.
  - Added the required column `number` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "number" VARCHAR(50) NOT NULL,
ADD COLUMN     "postalCode" VARCHAR(16) NOT NULL,
ALTER COLUMN "street" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "neighborhood" DROP NOT NULL,
ALTER COLUMN "neighborhood" SET DATA TYPE VARCHAR(64),
ALTER COLUMN "city" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "state" SET DATA TYPE VARCHAR(64),
ALTER COLUMN "country" SET DEFAULT 'IT',
ALTER COLUMN "country" SET DATA TYPE VARCHAR(8);
