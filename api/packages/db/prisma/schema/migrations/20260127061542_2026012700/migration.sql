/*
  Warnings:

  - You are about to drop the column `latitude` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `addresses` table. All the data in the column will be lost.

*/
-- Ensure PostGIS is available
CREATE EXTENSION IF NOT EXISTS postgis;

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "location" geometry(Point, 4326);

-- CreateIndex
CREATE INDEX "idx_addresses_location" ON "addresses" USING GIST ("location");
