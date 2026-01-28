/*
  Warnings:

  - Made the column `province` on table `addresses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "province" SET NOT NULL;
